const https = require("https");
const axios = require("axios"); // using for post request
const AuthorizationToken = "Bearer ECrryjSVyerGMfhKq6a-bcYqfAfOPEp1XK9IJh5CPqQtQ4A5TCpyfOYmGtImCU5Ule38xfmji2bZDTvRGQtK18Ta0E3WOYHqes-ZfKFg76cr8qUr1EfrcRknIfgBCN1l1scUBz24eSS8dw2-eWhAvtHbgxv9PqmUyf-d6qfUbF8eMaOIPDvWPGw8gu4qWZZGhG2ZEsGhFkRWdaggJUt4dA2rZpAhsVAyL7YDdZPUW23dWrCZgEsKLvzFvJDkk6Cj4bKji3vFZEQrZHfhQ_Yzlmc9EDNULPHuFcDEbDbV8DUZNU7VLPTHwo9AfVoVigzi8Vl9tX_bT2c9SB-2_JZrz00ptfOtZFCw--ygemNoE5etQzyj_YChnLu1YJqT8eQB";
  
exports.getAdmins =  (callBack)=>{
    const AllAdminsApi ="https://c2aco568.caspio.com/rest/v2/tables/admins/records";
    var config = {
      method: "get",
      url: AllAdminsApi,
      headers: {
        accept: "application/json",
        Authorization: AuthorizationToken,
      },
    };

  axios(config)
    .then((response) => {
      const AdminData = response.data;
      const AdminValues = [];
      let adminValue;
      for (let record of AdminData.Result) {
        adminValue = {
          id: record.PK_ID,
          name: record.name,
          PhoneNumber: record.phone_number,
          password: record.password
        };
        AdminValues.push(adminValue);
      }
      callBack(AdminValues);
    })
    .catch((error) => {
        callBack(null)
     // console.log(error);
    });
}

exports.getMembers = (callBack) => {
  const AllMembersApi ="https://c2aco568.caspio.com/rest/v2/tables/members/records";
  var config = {
    method: "get",
    url: AllMembersApi,
    headers: {
      accept: "application/json",
      Authorization: AuthorizationToken,
    },
  };

  axios(config)
    .then((response) => {
      const MemberData = response.data;
      const MembersValues = [];
      let memberValues;
      for (let record of MemberData.Result) {
        memberValues = {
          id: record.PK_ID,
          name: record.name,
          PhoneNumber: record.phone_number,
          warningCount: record.warnings,
          money: record.money,
        };
        MembersValues.push(memberValues);
      }
      callBack(MembersValues);
    })
    .catch((error) => {
        callBack(null)
     // console.log(error);
    });
}

exports.getSearchedMembers = (q,callBack) => {
    const SearchedMembersApi ="https://c2aco568.caspio.com/rest/v2/tables/members/records?q.where=(name LIKE N'%"+ encodeURI(q)+"%')";
    var config = {
      method: "get",
      url: SearchedMembersApi,
      headers: {
        accept: "application/json",
        Authorization: AuthorizationToken,
      },
    };
  
    axios(config)
      .then((response) => {
        const MemberData = response.data;
        const MembersValues = [];
        let memberValues;
        for (let record of MemberData.Result) {
          memberValues = {
            id: record.PK_ID,
            name: record.name,
            PhoneNumber: record.phone_number,
            warningCount: record.warnings,
            money: record.money,
          };
          MembersValues.push(memberValues);
        }
        callBack(MembersValues);
      })
      .catch((error) => {
          callBack(null)
       // console.log(error);
      });
}

exports.getMemberById = (id, callBack) => {
  const MemberByIdApi ="https://c2aco568.caspio.com/rest/v2/tables/members/records?q.where=PK_ID=" +id;
  var config = {
    method: "get",
    url: MemberByIdApi,
    headers: {
      accept: "application/json",
      Authorization: AuthorizationToken,
    },
  };
  axios(config)
    .then((response) => {
      const MemberData = response.data.Result[0];
      const member = {
        id: MemberData.PK_ID,
          name: MemberData.name,
          PhoneNumber: MemberData.phone_number,
          warningCount: MemberData.warnings,
          money: MemberData.money,
      };
      callBack(member);
    })
    .catch((error) => {
        callBack(null);
       //  console.log(error);
    });
}

exports.creatMember = (newMemeber, callBack) =>{
    let member = {
      name: newMemeber.name,
      phone_number: newMemeber.PhoneNumber,
      money: newMemeber.money,
      warnings: newMemeber.warningCount,
    };
    const creatMemberApi = "https://c2aco568.caspio.com/rest/v2/tables/members/records"
    var config = {
        method: 'post',
        url: creatMemberApi,
        headers: { 
          'accept': 'application/json', 
          'Content-Type': 'application/json', 
          'Authorization': AuthorizationToken
        },
        data : member
      };
      axios(config)
    .then((response) => {
        callBack(response.data);
      })
    .catch((error) => {
      //  console.log(error);
        callBack(null);
      });
}

exports.updateMember = (id,type, newValue, callBack) =>{
    let updatedValue 
    id++
    let updateMemberApi="https://c2aco568.caspio.com/rest/v2/tables/members/records?q.where=PK_ID=" +id;
    if (type === "Name") {
      updatedValue = {name: newValue,};
    } else if (type === "Warnings") {
      updatedValue = {warnings: newMemeber.warningCount,};
    } else {
      updatedValue = {money: newMemeber.money,};
    }
    var config = {
      method: "put",
      url: updateMemberApi,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
      data: updatedValue,
    };
    axios(config)
      .then((response) => {
        callBack(JSON.stringify(response.data));
      })
      .catch((error) => {
       // callBack(null);
      });
}

exports.deleteMember = (id,callBack) =>{
    id++
    const DeleteMemberByIdApi = "https://c2aco568.caspio.com/rest/v2/tables/members/records?q.where=PK_ID=" +id
    let config = {
      method: 'delete',
      url: DeleteMemberByIdApi,
      headers: {
        accept: "application/json",
        Authorization: AuthorizationToken,
      }
    };
    axios(config)
      .then((response) => {
          callBack(JSON.stringify(response.data));
        })
      .catch((error) => {
          callBack(null);
        });
}
