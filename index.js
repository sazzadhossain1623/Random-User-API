const express = require("express");
const cors = require("cors");
const app = express();
// const fs = require("fs");
// const data = require("./modles/users.modle.json");
const port = process.env.PORT || 5000;

const userRoute = require("./routes/v1/users.route");
const randomUserRoute = require("./routes/v1/user.random.route");
const saveUserRoute = require("./routes/v1/save.user.route");
const updateUserRoute = require("./routes/v1/update.user.route");
const deleteUserRoute = require("./routes/v1/delete.user.route");
// const limiter = require("./middleware/limiter");

app.use(cors());
app.use(express.json());

// app.use(limiter);
// app.set("view engine", "ejs");

app.use("/user/all", userRoute);
app.use("/user/random", randomUserRoute);
app.use("/user/save", saveUserRoute);
app.use("/user/update", updateUserRoute);
app.use("/user/delete", deleteUserRoute);

app.all("*", (req, res) => {
  res.send("<h1>Hello from Random User API Server. By the way No Route Has Been Found.</h1>");
});

app.get("/", (req, res) => {
  res.send("Backend Server");
});
app.listen(port, () => {
  console.log(`This erver is loading from ${port} port`);
});
