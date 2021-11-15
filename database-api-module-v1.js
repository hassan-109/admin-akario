const https = require('https')
const axios = require('axios');// using for post request

const ApiKey = "dcI8oYWPfjh4VdG8kkWQXe";
const AkarioDatabaseID = "acW7NdK8jaBOpcUe_dIhqg";
const AdminFormID = "czqdBcJGzjp4kSWPfCW7vu";
const MemeberFormID = "auWOq_B8jjWOJcLb_cOuvB";

const AllAdminsApi = "https://quintadb.com/apps/" + AkarioDatabaseID + "/dtypes/entity/" + AdminFormID + ".json?rest_api_key=" + ApiKey;
const AllMembersApi = "https://quintadb.com/apps/" + AkarioDatabaseID + "/dtypes/entity/" + MemeberFormID + ".json?rest_api_key=" + ApiKey;


const AdminValues = [];


https.get(AllAdminsApi, (respons) => {
  respons.on('data', (data) => {
    const AdminData = JSON.parse(data)
    let adminValue ;
    for (let record of AdminData.records){
      adminValue = {
          name: record.values.dcH2Kihc1cI6bNvNtcQSkM,
          password: record.values.cGze8TWP1hWQFdNmkDW6Cq,
          PhoneNumber: record.values.dcR8kAFCnpii9CWOpdPmo_
      };
      AdminValues.push(adminValue);
    }
  });

}).on('error', (e) => {
 // console.error(e);
});



exports.getAdmins =  ()=>{
  return AdminValues;
}
//&page=2
exports.getMembers = (callBack) => {
  https.get(AllMembersApi, (respons) => {
    let mData = '';
    respons.on('data', (data) => {
      mData += data;
    });
    respons.on("end", function () {
      const MembersValues = [];
      const MemberData = JSON.parse(mData);
      
      let memberValues;
      for (let record of MemberData.records) {
        memberValues = {
          id: record.id,
          name: record.values.cEt1GHeXLcHlpcT8kPgwmP,
          PhoneNumber: record.values.dcGCofW5LofA8zW7JdHSkD,
          warningCount: record.values.aVBmooW75dM4ksxGORdmot,
          money: record.values.cNWRuRWRTnWRFdHdOKvCkp
        };
        MembersValues.push(memberValues);
      }

      /*/*/
      https.get(AllMembersApi + "&page=2", (respons) => {
        let mData = '';
        respons.on('data', (data) => {
          mData += data;
        });
        respons.on("end", function () {
          const MemberData = JSON.parse(mData);
          
          let memberValues;
          for (let record of MemberData.records) {
            memberValues = {
              id: record.id,
              name: record.values.cEt1GHeXLcHlpcT8kPgwmP,
              PhoneNumber: record.values.dcGCofW5LofA8zW7JdHSkD,
              warningCount: record.values.aVBmooW75dM4ksxGORdmot,
              money: record.values.cNWRuRWRTnWRFdHdOKvCkp
            };
            MembersValues.push(memberValues);
          }
          callBack(MembersValues);
        });
      }).on('error', (e) => {
      //  console.error(e);
        callBack(null);
      });
    });
  }).on('error', (e) => {
  //  console.error(e);
    callBack(null);
  });
}


exports.getMemberById = (id, callBack) => {
  const MemberByIdApi = "https://quintadb.com/apps/" + AkarioDatabaseID + "/dtypes/" + id + ".json?rest_api_key=" + ApiKey;
  https.get(MemberByIdApi, (respons) => {
    respons.on('data', (data) => {
      const MemberData = JSON.parse(data).record;
      const member = {
        id: MemberData.id,
        name: MemberData.values.cEt1GHeXLcHlpcT8kPgwmP,
        PhoneNumber: MemberData.values.dcGCofW5LofA8zW7JdHSkD,
        warningCount: MemberData.values.aVBmooW75dM4ksxGORdmot,
        money: MemberData.values.cNWRuRWRTnWRFdHdOKvCkp
      };
      callBack(member);
    });
  }).on('error', (e) => {
   // console.error(e);
    callBack(null);
  });
}

const NameId = "cEt1GHeXLcHlpcT8kPgwmP";
const WarningCountId ="aVBmooW75dM4ksxGORdmot";
const MoneyId = "cNWRuRWRTnWRFdHdOKvCkp";

exports.updateMember = (id, type, newValue, callBack) => {
  let updateMemberApi;
  if (type === "Name") {
    updateMemberApi = "https://quintadb.com/cell_values/" + id + "/update_cell_value/" + NameId + ".json?rest_api_key=" + ApiKey + "&property_id=" + id + "&dtype_id=" + NameId + "&val=" + newValue;
  } else if (type === "Warnings") {
    updateMemberApi = "https://quintadb.com/cell_values/" + id + "/update_cell_value/" + WarningCountId + ".json?rest_api_key=" + ApiKey + "&property_id=" + id + "&dtype_id=" + WarningCountId + "&val=" + newValue;
  } else {
    updateMemberApi = "https://quintadb.com/cell_values/" + id + "/update_cell_value/" + MoneyId + ".json?rest_api_key=" + ApiKey + "&property_id=" + id + "&dtype_id=" + MoneyId + "&val=" + newValue;
  }
  let config = {
    method: 'post',
    url: encodeURI(updateMemberApi)
  };
  axios(config)
    .then(function (response) {
      callBack(JSON.stringify(response.data));
    })
    .catch(function (error) {
      //console.log(error);
      callBack(null);
    });
}

exports.creatMember = (newMemeber, callBack) => {
  let newvalues = {
    entity_id: MemeberFormID,
    id: makeid(),
    cEt1GHeXLcHlpcT8kPgwmP: newMemeber.name,
    dcGCofW5LofA8zW7JdHSkD: newMemeber.phoneNumber,
    aVBmooW75dM4ksxGORdmot: newMemeber.warningCount,
    cNWRuRWRTnWRFdHdOKvCkp: newMemeber.money // money
  };
  let creatMemberApi = "https://quintadb.com/apps/" + AkarioDatabaseID + "/dtypes.json?rest_api_key=" + ApiKey + "&json_values=" + JSON.stringify(newvalues);

  let config = {
    method: 'post',
    url: encodeURI(creatMemberApi)
  };
  axios(config)
    .then((response) => {
        callBack(JSON.stringify(response.data));
      })
    .catch((error) => {
       // console.log(error);
        callBack(null);
      });
}

function makeid() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 22; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

exports.deleteMember = (id,callBack) =>{
  const DeleteMemberByIdApi = "https://quintadb.com/apps/" + AkarioDatabaseID +"/dtypes/"+id+".json?rest_api_key="+ApiKey;
  let config = {
    method: 'delete',
    url: encodeURI(DeleteMemberByIdApi)
  };
  axios(config)
    .then((response) => {
        callBack(JSON.stringify(response.data));
      })
    .catch((error) => {
       // console.log(error);
        callBack(null);
      });
}