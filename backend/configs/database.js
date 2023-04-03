const mongoose = require("mongoose");
require("dotenv").config();
// put your mongoAtlas DB link as string in connect function.
const connection = mongoose.connect(process.env.DATABASE_URL);

module.exports = { connection };
