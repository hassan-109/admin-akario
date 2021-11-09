const https = require("https");
const axios = require("axios"); // using for post request
const schedule = require('node-schedule'); // for schedule the event

let AuthorizationToken = "Bearer 9zVlLZgCskqPszWvKaa_R_EYbovWirIMia0x6WrX6gZg2AYyRopPJiZASCEI0sBhyA4ocIyS40r4EgktKxISfNRDFDoIXzsqFDNHkDpqeN0mUNbEpmvwSuvPYDAk5Wqn5SI3zsjNG7JRBlHgIuOvPNzn_SVyfA5YaGp3-kOI0WjyVSFAKhRmEsPPEFwCoVm8VMSvmHGjaN3nejqNkVXIWyDLQQvdDYS1G3xlM2b0LARbRxfzyu64V82g-9upi-RSFIEA6vbTt64eALStlSW0C3T893xRjlRAev-rq9FNzdmPXwWLHkosgE3H5vazGeTkY1myQhcvjRUipEmptU2UKyxhCJs9ykLlfA5_HFP31WwSab0fS8SglvXeddfmULvV";



/*const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.tz = "Asia/Riyadh";

const job = schedule.scheduleJob(rule, () => {}
  
 let data =" grant_type=client_credentials&client_id=da734859e9554e6579f7aa274945e625dcdf640018821f2f01&client_secret=54ce51753685479eb44f91cf99f1ca8ba9983465cb9b3b84cd";

  */

  /*let config = {
    method: "post",
    url: "https://c2aco568.caspio.com/oauth/token",
    headers: {
      "Content-Type": "text/plain",
    },
    data: data,
  };
axios(config)
    .then((response) => {
      AuthorizationToken = "Bearer " + response.data.access_token;
    })
    .catch((error) => {
      console.log(error);
    });
*/
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
  const AllMembersApi ="https://c2aco568.caspio.com/rest/v2/tables/members/records?q.limit=300";
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
    let updateMemberApi="https://c2aco568.caspio.com/rest/v2/tables/members/records?q.where=PK_ID=" +id;
    if (type === "Name") {
      updatedValue = {name: newValue,};
    } else if (type === "Warnings") {
      updatedValue = {warnings: newValue,};
    } else {
      updatedValue = {money: newValue,};
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
        console.log(error);
       // callBack(null);
      });
}

exports.deleteMember = (id,callBack) =>{
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
