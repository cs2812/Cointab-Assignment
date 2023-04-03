require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { connectDatabase  } = require("./configs/database");
const { loginRoute } = require("./Routes/login");
const { signupRoute } = require("./Routes/signup");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send("Jai Shree Ganesh");
});

app.listen(PORT, async () => {
  try {
    await connectDatabase ;
    console.log(`Server running on : http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
