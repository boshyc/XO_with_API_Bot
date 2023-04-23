import { Sequelize } from "sequelize-typescript";
const { Recorded } = require("./models")

const connection = new Sequelize({
  dialect: "sqlite",
  host: "localhost",
  username: "root",
  password: "root",
  database: "backend-xo",
  storage:"./backend-xo.db",
  logging: false,
  models: [Recorded]
});



export default connection;