import axios from "axios";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const path = `http://localhost:8000/data?Gamenum=${id}`;
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(1);
  const [loop, setloop] = useState(1);

  const [num, Setnum] = useState(0);
  const [turn, Setturn] = useState("X");
  const [mark, Setmark] = useState("◇");
  const [ismark, setismark] = useState(Array(num * num).fill(mark));
  const [iswin, setiswin] = useState(false);
  const [Gamenum, Setgamenum] = useState(0);
  const [isxwin, Setisxwin] = useState(false);
  const [Draw, setDraw] = useState(false);

  const fetchData = async () => {
    if (typeof id === "string" && id !== undefined) {
      const res = await axios.get(path);
      setdata(res.data);
      Setnum(res.data[0].box);
      Setgamenum(res.data[0].Gamenum);
      if (res.data[res.data.length - 1].Start == undefined)
        Setisxwin(res.data[res.data.length - 1].isXwin);
      else setDraw(true);
    }
  };

  useEffect(() => {
    fetchData();
    setismark(Array(num * num).fill(mark));
  }, [num]);

  const fetchData_ = async () => {
    const response = await axios.get(path);
    if (response.data[0].start != undefined) Setturn(response.data[0].Start);
  };

  useEffect(() => {
    fetchData_();
  }, []);

  const getTurn = () => {
    data[0].Start == "X"
      ? Setturn(loop % 2 == 1 ? "O" : "X")
      : Setturn(loop % 2 == 1 ? "X" : "O");
  };

  const updateloop = () => {
    getTurn();

    if (data[loop].isXwin != null) {
      setiswin(true);
    } else {
      if (data[0].Start == "X") {
        if (loop % 2 == 1) ismark[data[loop].Xmove] = "X";
        else ismark[data[loop].Omove] = "O";
      } else {
        if (loop % 2 == 1) ismark[data[loop].Omove] = "O";
        else ismark[data[loop].Xmove] = "X";
      }
    }
    setismark(ismark);
    if (loop < data.length-1)
      setloop(loop + 1);
    else
      setiswin(true)
  };

  return (
    <div className="body-index">
      {!show ? (
        <div>
          {iswin ? (
            <div className="centered ending">
              <i>
                <label>
                  {Draw || isxwin ? (Draw ? "Draw!" : "X won!") : "O won!"}
                </label>
                <br />
                <label>Replay End</label>
              </i>
            </div>
          ) : (
            <div className="centered">
              <div>
                <div>
                  <label>
                    <i className="label-i">
                      {num} X {num}
                    </i>
                    <label>Game: {Gamenum}</label>
                    <br />
                    <label className="turn">Turn: {turn}</label>
                    <br />
                  </label>
                </div>
              </div>
              <div className="div-50">
                <label>Turn: {loop}</label>
                <div className="div-body">
                  {Array.from({ length: num }, (_, i) => (
                    <div className="div-box" key={i}>
                      {Array.from({ length: num }, (_, j) => (
                        <span key={j}>
                          <button className="button-pvp text-change">
                            {ismark[(num - 1) * i + j + i]}
                          </button>
                        </span>
                      ))}
                    </div>
                  ))}
                  <button className="next" onClick={updateloop}>
                    {
                    data[loop].isXwin == null && data[loop].Start== null
                      ? "Next"
                      : "End"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="centered main-replay">
          <div>
            <i>
              <label>Game: {Gamenum}</label>
            </i>
            <br></br>
            <i>
              <label>
                {Draw || isxwin ? (Draw ? "Draw!" : "X won!") : "O won!"}
              </label>
            </i>
            <br></br>
            <button
              onClick={() => {
                setshow(0);
              }}
            >
              play
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
