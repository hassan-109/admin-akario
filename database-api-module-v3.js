const e = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:gPrZG5vQD5yx1L26@cluster0.7hl3w.mongodb.net/akarioDataBase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const adminSchema = {
  phone_number: String,
  password: String,
  name: String,
};

const memberSchema = {
  phone_number: String,
  name: String,
  money: Number,
  warnings: Number,
};

const AdminModel = mongoose.model("Admin", adminSchema);
const MemberModel = mongoose.model("Member", memberSchema);

exports.getAdmins = (callBack) => {
  AdminModel.find((error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};

exports.getMembers = (callBack) => {
  MemberModel.find((error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};

exports.getSearchedMembers = (q, callBack) => {
  MemberModel.find({ "name": { $regex: '.*' + q + '.*' } },(error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};

exports.getMemberById = (id, callBack) => {};

exports.creatMember = (newMemeber, callBack) => {
  new MemberModel({
    phone_number: newMemeber.phone_number,
    name: newMemeber.name,
    money: newMemeber.money,
    warnings: newMemeber.warnings,
  })
    .save()
    .then((error, result) => {
      if (error) callBack(null);
      else callBack(result);
    });
};

exports.updateMember = (id, type, newValue, callBack) => {};

exports.deleteMember = (id, callBack) => {};
