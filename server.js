const express = require("express");
const app = express();
const { sequelize } = require("./db");
const musicianRouters = require("./routers/musicianRouters")

const port = 3000;

//TODO
app.use(express.json());
app.use(musicianRouters)

sequelize.sync().then(function () {
   app.listen(port, () => {
      console.log("Your server is listening on port " + port);
   });
})