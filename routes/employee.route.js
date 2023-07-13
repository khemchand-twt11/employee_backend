const express = require("express");
const Auth = require("../middlewares/auth");
const Emp = require("../models/employee.model");

const EmpRoute = express.Router();

EmpRoute.post("/employees", Auth, async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;
  const ifUserExists = await Emp.findOne({ email });
  if (ifUserExists)
    return res.status(400).json({ msg: "employee already present" });

  const newEmployee = new Emp({
    firstName,
    lastName,
    email,
    department,
    salary,
  });

  await newEmployee.save();
  res.status(200).json({ msg: "employee added successfully" });
});

EmpRoute.get("/employees", async (req, res) => {
  try {
    let employees = await Emp.find();

    if (req.query.sortBy === "asc") {
      employees = employees.sort((a, b) => a.salary - b.salary);
    } else if (req.query.sortBy === "desc") {
      employees = employees.sort((a, b) => b.salary - a.salary);
    }

    if (req.query.filter) {
      employees = employees.filter(
        (employee) => employee.department === req.query.filter
      );
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(400).json({ error: "Server error" });
  }
});

EmpRoute.put("/employees/:id", async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;
  try {
    const employee = await Emp.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        department,
        salary,
      },
      { new: true }
    );
    if (!employee) {
      return res.status(400).json({ msg: "Employee not found" });
    }
    res.status(200).json({ msg: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ error: "Server error" });
  }
});

EmpRoute.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Emp.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(400).json({ msg: "Employee not found" });
    }
    res.status(200).json({ msg: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(400).json({ error: "Server error" });
  }
});

EmpRoute.get("/employees", async (req, res) => {
  try {
    let employees = await Emp.find();

    // Sorting
    if (req.query.sortBy === "asc") {
      employees = employees.sort((a, b) => a.salary - b.salary);
    } else if (req.query.sortBy === "desc") {
      employees = employees.sort((a, b) => b.salary - a.salary);
    }

    // Filtering
    if (req.query.filter) {
      employees = employees.filter(
        (employee) => employee.department === req.query.filter
      );
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(400).json({ error: "Server error" });
  }
});

module.exports = EmpRoute;
