const { Router } = require("express");
const { UserModel } = require("../model/user.model");
const getid = require("getid");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const loginRoute = Router();

loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  const userPassword = user?.password;

 // Verifying Password
    if (userPassword === password) {
      const userData = {
        name: user.name,
        email: user.email,
      };
      await UserModel.updateOne(
        { email },
        { $set: { wrongAttempt: 0 } }
      );
      let token = getid();
      // console.log(userData)
      res.send({
        message: "login successful",
        token,
        userData,
      });
    }
    else {
      // update wrongAttempt +1
      await UserModel.updateOne(
        { email },
        { $inc: { wrongAttempt: 1 } }
      );
      const updatedUser = await UserModel.findOne({ email });

      const wrongCount = updatedUser?.wrongAttempt;

      if (wrongCount > 4) {
        res.send({
          message: "Something went wrong",
          error: `5 attempts`,
          wrongCount,
        });
      } 
      else {
        res.send({
          message: "Something went wrong",
          wrongCount,
        });
      }
    }
  });

// after 24 hours We will make request to set wrongAttempt to 0
loginRoute.patch("/attempt", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    const WrongCount = await UserModel.updateOne(
      { email },
      { $set: { wrongAttempt: 0 } }
    );
    const user = await UserModel.findOne({ email });
    res.send({
      message: "Count update successfully",
      wrongCount: user?.wrongAttempt,
    });
  } else {
    res.send({ message: "Something went wrong", error: "User not found" });
  }
});
module.exports = { loginRoute };
