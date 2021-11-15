const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const adminSchema = {
  phone_number: String,
  password: String,
  name: String,
};

const memberSchema = {
  phone_number: String,
  password: String,
  name: String,
  money: Number,
  warnings: Number,
};

const AdminModel = mongoose.model("Admin", adminSchema);
const MemberModel = mongoose.model("Member", memberSchema);

exports.getAdmins =  (callBack)=>{

}

exports.getMembers = (callBack) => {

}

exports.getSearchedMembers = (q,callBack) => {

}

exports.getMemberById = (id, callBack) => {

}

exports.creatMember = (newMemeber, callBack) =>{

}

exports.updateMember = (id,type, newValue, callBack) =>{

}

exports.deleteMember = (id,callBack) =>{
    
}