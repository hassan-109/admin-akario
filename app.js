const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const database = require(__dirname + "/database-api-module.js");

const app = express();

const Admins = database.getAdmins();

let loggedAdmin = null;
let chosenMember = null;

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.get("/login", function (req, res) {
  res.render("login.ejs");
});

app.get("/", function (req, res) {
  if (!stayLogged(res)) return;
  res.render("home.ejs", {
    loggedAdmin: loggedAdmin,
  });
});

app.get("/members", function (req, res) {
  database.getMembers(function (MembersValues) {
    if (MembersValues !== null) {
      res.render("member-home.ejs", {
        members: MembersValues,
      });
    }
  });
});

app.get("/members/:q", function (req, res) {
  database.getMembers(function (MembersValues) {
    if (MembersValues !== null) {
      res.render("member-home.ejs", {
        members: filterIt(MembersValues, req.params.q),
      });
    }
  });
});

app.get("/add", function (req, res) {
  if (!stayLogged(res)) return;
  database.getMembers(function (MembersValues) {
    if (MembersValues !== null) {
      res.render("add.ejs", {
        members: MembersValues,
      });
    }
  });
});


app.get("/add/:q", function (req, res) {
  if (!stayLogged(res)) return;
  database.getMembers(function (MembersValues) {
    if (MembersValues !== null) {
      res.render("add.ejs", {
        members: filterIt(MembersValues, req.params.q),
      });
    }
  });
});

app.get("/add-form", function (req, res) {
  if (!stayLogged(res)) return;
  res.render("add-form.ejs");
});


app.get("/update/:listType", function (req, res) {
  if (!stayLogged(res)) return;
  database.getMembers(function (MembersValues) {
    if (MembersValues !== null) {
      res.render("update.ejs", {
        title: req.params.listType,
        members: MembersValues,
      });
    }
  });
});

app.get("/update/:listType/:q", function (req, res) {
  if (!stayLogged(res)) return;
  database.getMembers(function (MembersValues) {
    if (MembersValues !== null) {
      res.render("update.ejs", {
        title: req.params.listType,
        members: filterIt(MembersValues, req.params.q),
      });
    }
  });
});

app.get("/update-form/:listType/:id", function (req, res) {
  if (!stayLogged(res)) return;
  database.getMemberById(req.params.id, function (ChosenMember) {
    if (ChosenMember !== null) {
      chosenMember = ChosenMember;
      res.render("update-form.ejs", {
        title: req.params.listType,
        member: ChosenMember,
      });
    }
  });
});

app.get("/delete/member/:id",function(req,res){
  database.deleteMember(req.params.id,function(data){
    if(data !== null){
      res.redirect("/add");
    }
  })
})

app.get("/update/member/:newName/:id",function(req,res){
  req.params.id
  database.updateMember(req.params.id,"Name",req.params.newName,function (e) {
      if (e !== null) {
        res.redirect("/add");
      }
    }
  );
})

app.post("/login", function (req, res) {
  if (isLoginSuccessfully(req.body.phoneNumber, req.body.password)) {
    res.redirect("/");
    return;
  }
  res.redirect("/login");
});

app.post("/search/:listType", function (req, res) {
  if (req.params.listType === "member") {
    res.redirect("/add/" + req.body.search);
  } else if (req.params.listType === "memberhome") {
    res.redirect("/members/" + req.body.search);
  }else{
    res.redirect("/update/" + req.params.listType + "/" + req.body.search);
  }
});

app.post("/update/:listType", function (req, res) {
  let current;
  if (req.params.listType === "Warnings") {
    current = parseInt(chosenMember.warningCount);
  } else {
    current = parseInt(chosenMember.money);
  }

  const added = parseInt(req.body.added);
  const removed = parseInt(req.body.removed);
  const newValue = current + added - removed;

  database.updateMember(
    chosenMember.id,
    req.params.listType,
    newValue,
    function (e) {
      if (e !== null) {
        res.redirect("/update/" + req.params.listType);
      }
    }
  );
});

app.post("/add",function(req,res){
  const newMemeber = {
    name: req.body.name,
    phoneNumber:req.body.phoneNumber,
    warningCount:req.body.warningCount,
    money :req.body.money
  }

  database.creatMember(newMemeber,(data)=>{
    if(data !== null){
      res.redirect("/add");
    }
  })
})

function stayLogged(res) {
  if (loggedAdmin === null) {
    res.redirect("/login");
    return false;
  }
  return true;
}

function isLoginSuccessfully(userPhoneNumber, userPassword) {
  let isCurrectPassword = false;
  for (var admin of Admins) {
    if (
      admin.PhoneNumber === userPhoneNumber &&
      admin.password === userPassword
    ) {
      loggedAdmin = admin;
      isCurrectPassword = true;
    }
  }
  return isCurrectPassword;
}

function filterIt(arr, searchKey) {
  return arr.filter(function (obj) {
    return Object.keys(obj).some(function (key) {
      if(searchKey === undefined)
      return
      return obj[key].includes(String(searchKey));
    });
  });
}

app.listen(process.env.PORT || 5000, function() {
 // console.log("Server started on port 5000");
});
