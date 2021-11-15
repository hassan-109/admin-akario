const e = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_HOST_V3,
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
  MemberModel.find({ name: { $regex: ".*" + q + ".*" } }, (error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};

exports.getMemberById = (id, callBack) => {
  MemberModel.findById(id, (error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};

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

exports.updateMember = (id, type, newValue, callBack) => {
  let updatedValue;
  if (type === "Name") {
    updatedValue = { name: newValue };
  } else if (type === "Warnings") {
    updatedValue = { warnings: newValue };
  } else {
    updatedValue = { money: newValue };
  }
  MemberModel.findByIdAndUpdate(id, { $set: updatedValue }, (error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};

exports.deleteMember = (id, callBack) => {
  MemberModel.findByIdAndRemove(id, (error, result) => {
    if (error) callBack(null);
    else callBack(result);
  });
};
