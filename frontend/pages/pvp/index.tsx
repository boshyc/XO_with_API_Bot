import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

const index = () => {
  const [num, Setnum] = useState(0);
  const [count, Setcount] = useState(0);
  const [turn, Setturn] = useState("");
  const [mark, Setmark] = useState("◇");
  const [ismark, setismark] = useState(Array(num * num).fill(mark));
  const [ismark_, setismark_] = useState(Array(num * num).fill(false));
  const [iswin, setiswin] = useState(false);
  const [Gamenum, Setgamenum] = useState(0);
  const [isxwin, setisxwin] = useState(Boolean);
  const path = "http://localhost:8000";
  const [show, setshow] = useState(0);
  const [box, Setbox] = useState(0);
  const [point, setpoint] = useState(0);
  const [Start, setStart] = useState("X");
  const [Draw_, setDraw_] = useState(false);
  const [count_, Setcount_] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(path);
    const data = response.data[response.data.length - 1].box;
    const data_num = response.data[response.data.length - 1].Gamenum;
    const isXwin = response.data[response.data.length - 1].isXwin;
    const start = response.data[response.data.length - 1].Start;
    setStart(start);
    setisxwin(isXwin);
    Setnum(data);
    Setgamenum(data_num);
  };

  useEffect(() => {
    fetchData();
    Setturn(Start);
    setismark(Array(num * num).fill(mark));
    setismark_(Array(num * num).fill(false));
  }, [num]);

  const wincon_row = () => {
    for (let index = 0; index <= 2 * num; index += num) {
      for (let index_ = 0; index_ <= num - 3; index_ += 1) {
        let element1 = ismark[index + index_];
        let element2 = ismark[index + 1 + index_];
        let element3 = ismark[index + 2 + index_];
        if (element1 == element2 && element1 == element3 && element1 != mark) {
          Setcount((count + 1) % 2);
          Start == "X"
            ? Setturn(count ? "O" : "X")
            : Setturn(count ? "X" : "O");
          setiswin(true);
          setisxwin(Start == "X" ? true : false);
          turn == "X" ? postwin(true) : postwin(false);
        }
      }
    }
  };

  const wincon_col = () => {
    for (let index = 0; index <= (num - 1) * num - num - 1; index++) {
      let element1 = ismark[index];
      let element2 = ismark[index + num];
      let element3 = ismark[index + 2 * num];
      if (element1 == element2 && element1 == element3 && element1 != mark) {
        Setcount((count + 1) % 2);
        Start == "X" ? Setturn(count ? "O" : "X") : Setturn(count ? "X" : "O");
        setiswin(true);
        setisxwin(Start == "X" ? true : false);
        turn == "X" ? postwin(true) : postwin(false);
      }
    }
  };

  const wincon_cross = () => {
    for (let index = num+1; index < num * num-num; index += 1) {
      let element1 = ismark[index];
      let element2 = ismark[index - num - 1];
      let element3 = ismark[index + num + 1];
      let element4 = ismark[index - num + 1];
      let element5 = ismark[index + num - 1];
      if (
        element1 == element2 &&
        element1 == element3 &&
        element1 != mark 
      ) {
        Setcount((count + 1) % 2);
        Start == "X" ? Setturn(count ? "O" : "X") : Setturn(count ? "X" : "O");
        setiswin(true);
        setisxwin(Start == "X" ? true : false);
        turn == "X" ? postwin(true) : postwin(false);
      }
      if (
        element1 == element4 &&
        element1 == element5 &&
        element1 != mark 
      ) {
        Setcount((count + 1) % 2);
        Start == "X" ? Setturn(count ? "O" : "X") : Setturn(count ? "X" : "O");
        setiswin(true);
        setisxwin(Start == "X" ? true : false);
        turn == "X" ? postwin(true) : postwin(false);
      }
    }
  };

  const postpoint = (nnum) => {
    turn == "X"
      ? axios.post(path, {
          box: box,
          Gamenum: Gamenum,
          Xmove: nnum,
          Omove: null,
        })
      : axios.post(path, {
          box: box,
          Gamenum: Gamenum,
          Xmove: null,
          Omove: nnum,
        });
  };

  const postwin = (i) => {
    axios.post(path, {
      box: box,
      Gamenum: Gamenum,
      Xmove: null,
      Omove: null,
      isXwin: i,
    });
  };

  const postDraw = () => {
    axios.post(path, {
      Gamenum:Gamenum,
      Start:"Draw",
    });
  };

  function updateDraw() {
  const dnum = count_+1;
  Setcount_(dnum);
  if (count_ >= 8) {
      setDraw_(true);
      postDraw();
  }
  }

  const wincon_ = (i, j) => {
    ismark[(num - 1) * i + j + i] = turn;
    ismark_[(num - 1) * i + j + i] = true;
    const nnum = (num - 1) * i + j + i;
    const dnum = count_
    setismark_(ismark_);
    setismark(ismark);
    Setcount((count + 1) % 2);
    Start == "X" ? Setturn(count ? "X" : "O") : Setturn(count ? "O" : "X");
    setpoint(nnum);
    postpoint(nnum);
    wincon_col();
    wincon_row();
    wincon_cross();
    updateDraw()
  };

  return (
    <div className="body-index">
      {iswin || Draw_ ? ( 
        <i>
          <div className="centered ending">
            <label>Game: {Gamenum}</label>
            <br />
            <label>{Draw_?'Draw!':isxwin ? "X win!" : "O win!"}</label>
          </div>
        </i>)
      : (
        <div className="centered">
          <div>
            <div>
              <label>
                <i className="label-i">
                  {num} X {num}
                </i>
                <label>Game: {Gamenum}</label>
                <br></br>
                <label className="turn">Turn: {turn}</label>
              </label>
            </div>
          </div>
          <div className="div-50">
            <div className="div-body">
              {Array.from({ length: num }, (_, i) => (
                <div className="div-box" key={i}>
                  {Array.from({ length: num }, (_, j) => (
                    <span key={`${num}${i}${j}`}>
                      <button
                        className="button-pvp"
                        disabled={ismark_[(num - 1) * i + j + i]}
                        key={j}
                        onClick={() => {
                          wincon_(i, j);
                          setshow(1);
                        }}
                      >
                        {ismark[(num - 1) * i + j + i]}
                      </button>
                    </span>
                  ))}
                </div>
              ))}
              {show
                ? `${turn == "X" ? "O" : "X"} is choose at ${point + 1} `
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
