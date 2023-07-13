const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
    },

    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    department: {
      type: String,
    },
    salary: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

const Emp = mongoose.model("Employee", employeeSchema);

module.exports = Emp;
