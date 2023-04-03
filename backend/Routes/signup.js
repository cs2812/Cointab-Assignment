const { Router } = require("express");
const validator = require("validator");
const { UserModel } = require("../model/user.model");
const signupRoute = Router();

signupRoute.get("/", async (req, res) => {
  const user = await UserModel.find();
  res.send(user);
});

signupRoute.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  // <----Email validation---->
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    res.send({ message: "Enter correct email" });
  } else {
    try {
      const userData = new UserModel({
        name,
        email,
        password,
      });
      await userData.save();
      // console.log(userData);
      res.status(201).send({ message: "signup sucessful" });
    } catch (error) {
      res.send({ message: "Something went wrong please try again" });
    }
  }
});

module.exports = { signupRoute };
