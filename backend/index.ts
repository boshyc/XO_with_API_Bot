const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
import { Request, Response } from "express";
import connection from "./connection";
import { Recorded } from "./models";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;
dotenv.config();

const start = () => {
  const connect = () => {
    connection.sync();
  };
  connect();
  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    const franc: Recorded[] = await Recorded.findAll();
    return res.json(franc);
  });

  app.get("/data", async (req: Request, res: Response): Promise<Response> => {
    const { Gamenum } = req.query;
    const data: Recorded[] = await Recorded.findAll({
      where: {
        Gamenum: Gamenum,
      },
    });
    return res.json(data);
  });

  app.post("/", async (req: Request, res: Response) => {
    const ly = await Recorded.create(req.body);
    res.json(ly);
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:8000}`);
  });
};

void start()
