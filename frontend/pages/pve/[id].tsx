import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [num, Setnum] = useState(3);
  const [Player, setPlayer] = useState(
    typeof id === "string" && id === "1" ? "Player" : "Bot"
  );
  const [Player_, setPlayer_] = useState(
    typeof id === "string" && id === "1" ? "X" : "O"
  );
  const [Prev, setPrev] = useState("Bot");
  const [mark, Setmark] = useState("◇");
  const [ismark, setismark] = useState(Array(num * num).fill(mark));
  const [ismark_, setismark_] = useState(Array(num * num).fill(false));
  const [iswin, setiswin] = useState(false);
  const [Gamenum, Setgamenum] = useState(1);
  const [isxwin, setisxwin] = useState(false);
  const path = "http://localhost:8080";
  const [show, setshow] = useState(0);
  const [point, setpoint] = useState(0);
  const [Start, setStart] = useState("X");
  const [Draw_, setDraw_] = useState(false);
  const [count_, Setcount_] = useState(0);

  const wincon_row = () => {
    for (let index = 0; index <= 2 * num; index += num) {
      for (let index_ = 0; index_ <= num - 3; index_ += 1) {
        let element1 = ismark[index + index_];
        let element2 = ismark[index + 1 + index_];
        let element3 = ismark[index + 2 + index_];
        if (element1 == element2 && element1 == element3 && element1 != mark) {
          setiswin(true);
          setismark(Array(num*num).fill(mark));
          reset();
          setPlayer(Player != "Player" ? "Bot" : "Player");
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
        setiswin(true);
        setismark(Array(num*num).fill(mark))
        reset();
        setPlayer(Player != "Player" ? "Bot" : "Player");
      }
    }
  };

  const wincon_cross = () => {
    for (let index = 4; index < num * num - num; index += 1) {
      let element1 = ismark[index];
      let element2 = ismark[index - num - 1];
      let element3 = ismark[index + num + 1];
      let element4 = ismark[index - num + 1];
      let element5 = ismark[index + num - 1];
      if (element1 == element2 && element1 == element3 && element1 != mark) {
        setiswin(true);
        setismark(Array(num*num).fill(mark))
        reset();
        setPlayer(Player != "Player" ? "Bot" : "Player");
      }
      if (element1 == element4 && element1 == element5 && element1 != mark) {
        setiswin(true);
        reset();
        setPlayer(Player != "Player" ? "Bot" : "Player");
      }
    }
  };

  function updateDraw() {
    const dnum = count_ + 1;
    Setcount_(dnum);
    if (count_ >= 4) {
      setDraw_(true);
      
    }
  }

  const wincon_ = (Mark: number, Player: string) => {
    ismark[Mark] = Player;
    ismark_[Mark] = true;
    const nnum = Mark;
    setismark_(ismark_);
    setismark(ismark);
    wincon_col();
    wincon_row();
    wincon_cross();
    updateDraw();
  };

  const Bot = async (used: number) => {
    const response = await axios.post(path, {
      Start: Player_,
      Status: false,
      Map: {
        Map_: ismark,
      },
      State: "Bot",
      Used:used
    });
    let temp: number = response.data.Mark;
    return temp;
  };

  if (typeof id === "string" && id === "2") {
    useEffect(() => {
      setTimeout(async () => {
        const botMark = await Bot(null);
        wincon_(botMark, "X");
        setPrev("Bot");
        setPlayer("Player");
      }, 50);
    }, []);
  }

  const reset = () => {
    axios.post(path, {
      Status: true,
      Map:
        {
          Map_:Array(num*num).fill(mark)
        }
    });
  };

  return (
    <div className="body-index">
      {iswin || Draw_ ? (
        <i>
          <div className="centered ending">
            <label>Game: {Gamenum}</label>
            <br />
            <label>
              {Draw_
                ? "Draw!"
                : Player_=="X" && id === "1"?"X win!":(Player_=="O"&&id==="2"?"X win!":"O win!")}
            </label>
          </div>
        </i>
      ) : (
        <div className="centered">
          <div>
            <div>
              <label>
                <i className="label-i">
                  {num} X {num}
                </i>
                <label>Game: {Gamenum}</label>
                <br></br>
                <label className="turn">Turn: {Player}</label>
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
                        onClick={async () => {
                          wincon_((num - 1) * i + j + i, Player_);
                          setPrev("Player");
                          setPlayer("Bot");
                          setTimeout(async () => {
                            const botMark = await Bot((num - 1) * i + j + i);
                            wincon_(
                              botMark,
                              typeof id === "string" && id === "1" ? "O" : "X"
                            );
                            if(!iswin&&!Draw_){
                            setPrev("Bot")
                            setPlayer("Player")
                        }}, 50);
                          if (Draw_||iswin) reset();
                          setshow(1);
                      }
                      }
                      >
                        {ismark[(num - 1) * i + j + i]}
                      </button>
                    </span>
                  ))}
                </div>
              ))}
              {show ? `${Prev} is choose at ${point + 1} ` : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
