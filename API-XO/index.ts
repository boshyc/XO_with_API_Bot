const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
import { Request, Response } from "express";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

dotenv.config();
const mark_ = "◇";
var ismark = Array(9).fill(mark_);
var danger = false;
var mark = 0;
var num = 3;
var state = true;
var used = Array(9)
var count = 0;

const checkmap = (ismark:[]) => {
  for (let index = 0; index < 6; index += 3) {
    if (
      ismark[index] == ismark[index + 1] &&
      ismark[index + 2] == mark_ &&
      ismark[index] != mark_
    ) {
      danger = true;
      mark = index + 2;
    }
    if (
      ismark[index] == ismark[index + 2] &&
      ismark[index + 1] == mark_ &&
      ismark[index] != mark_
    ) {
      danger = true;
      mark = index + 1;
    }
    if (
      ismark[index + 1] == ismark[index + 2] &&
      ismark[index] == mark_ &&
      ismark[index + 1] != mark_
    ) {
      danger = true;
      mark = index;
    }
  }
  for (let index = 0; index <= (num - 1) * num - num - 1; index++) {
    let element1 = ismark[index];
    let element2 = ismark[index + num];
    let element3 = ismark[index + 2 * num];
    if (element1 == element2 && element3 == mark_ && element1 != mark_) {
      danger = true;
      mark = index + 2 * num;
    }
    if (element1 == element3 && element2 == mark_ && element1 != mark_) {
      danger = true;
      mark = index + num;
    }
    if (element3 == element2 && element1 == mark_ && element2 != mark_) {
      danger = true;
      mark = index;
    }
  }
  for (let index = 3+1; index < num*num-num; index += 1) {
    let element1 = ismark[index];
    let element2 = ismark[index - num - 1];
    let element3 = ismark[index + num + 1];
    let element4 = ismark[index - num + 1];
    let element5 = ismark[index + num - 1];
    if (element2==undefined||element3==undefined||element4==undefined||element5==undefined)
    {
      index++;
    }
    else{
    if (
      element1 == element2 &&
      element3 == mark_ &&
      element1 != mark_
    ) {
      danger = true;
      mark = index + num + 1;
    }
    if (
      element1 == element3 &&
      element2 == mark_ &&
      element1 != mark_
    ) {
      danger = true;
      mark = index - 1 - num;
    }
    if (
      element3 == element2 &&
      element1 == mark_ &&
      element2 != mark_
    ) {
      danger = true;
      mark = index;
    }
    if (
      element1 == element4 &&
      element5 == mark_ &&
      element1 != mark_
    ) {
      danger = true;
      mark = index + num - 1;
    }
    if (
      element1 == element5 &&
      element4 == mark_ &&
      element1 != mark_
    ) {
      danger = true;
      mark = index - num + 1;
    }
    if (
      element4 == element5 &&
      element1 == mark_ &&
      element4 != mark_
    ) {
      danger = true;
      mark = index;
    }
  }}
};

var state = false;

app.post("/", async (req: Request, res: Response) => {
  const data = await req.body;
  var ismark_ = []
  if (!req.body.Status) {
    const plt = data.Start == "X" ? "O" : "X";
    const enemy = data.Start;
    const Mark = mark_
    used.push(data.Used)
    ismark_ = data.Map.Map_;
    console.log(ismark_);
    checkmap(ismark_);
    if (!danger) {
      let randomNumber = Math.floor(Math.random() * 9);
      while (true) {
        if (
          ismark[randomNumber] === Mark && 
          (ismark[randomNumber] != plt &&
          ismark[randomNumber] != enemy)
        )
        {
          var counter = 0;
          used.forEach(i=>{
            if (i===randomNumber && i!=null)
              counter++;
          })
          if (counter==0)
                break;
        }
          
        else
        {
          randomNumber = Math.floor(Math.random() * 9);
        }
      }
      used.push(randomNumber)
      mark = randomNumber;
    }
    if (danger)
          danger = false;
    if(used.length>=9)
      used = new Array(9)
  }
  
  res.json({ 
    Mark: mark,
    USED: used
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:8080}`);
});
