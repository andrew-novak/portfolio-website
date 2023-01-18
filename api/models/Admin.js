const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  safeDevices: [{ name: String, ip: String }],
});

const Admin = model("Admin", AdminSchema);

module.exports = Admin;
