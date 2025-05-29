// Maxsus texnika loyihasida Machine va MachineImages tablelariga CRUD yozish. Video ozirida tushuntirilgan

const express = require("express");
const config = require("config");
const PORT = config.get("port");
const sequelizes = require("./config/db");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);

async function start() {
  try {
    await sequelizes.authenticate();
    await sequelizes.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Err: ", error);
  }
}
start();
