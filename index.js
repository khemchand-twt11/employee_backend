const express = require("express");
const { connection } = require("./configs/db");
const userRoute = require("./routes/user.route");
const EmpRoute = require("./routes/employee.route");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

//ROUTES
app.use("/user", userRoute);
app.use("/emp", EmpRoute);
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("server is running at port", PORT);
  } catch (error) {
    console.log(error);
  }
});
