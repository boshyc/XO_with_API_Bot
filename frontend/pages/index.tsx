import React, { useLayoutEffect, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const index = (props: any) => {
  const [count, Setcount] = useState(1);
  const [Global_var, Setvar] = useState(3);
  const [box, Setbox] = useState(3);
  const [box_, Setbox_] = useState(3);
  const [Gamenum_, Setgamenum] = useState(0);
  const [Default_,setDefault] = useState('X');
  const [Pve,setPve]  = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000");
      res.data.length != 0
        ? Setgamenum(res.data[res.data.length - 1].Gamenum + 1)
        : Setgamenum(0);
    };
    fetchData();
  }, [Gamenum_]);

  return (
    <div className="body-index">
      <div>
        <div>
          <label>
            <i className="label-i">X vs O</i>
          </label>
        </div>
        <div className="div-50">
          <div>
            <Link href={"/pvp"}>
              <button
                onClick={() => {
                  console.log(Default_)
                  axios.post("http://localhost:8000", {
                    box: box,
                    Gamenum: Gamenum_,
                    Start:Default_
                  });
                }}
              >
                PvP
              </button>
            </Link>
          </div>
          <div>
            <button onClick={()=>{setPve(!Pve)}}>PvE</button>
            {
              Pve?
              <div className="go-button">
                <Link href={'/pve/1'}><button className="button-pve">Go First</button></Link><br />
                <Link href={'/pve/2'}><button className="button-pve">Go Second</button></Link>
              </div>
              :
              ''
            }
          </div>
          <button
            onClick={() => {
              Setcount((count + 1) % 2);
            }}
          >
            Option
          </button>
        </div>
        <div>
          <div>
            {count ? (
              ""
            ) : (
              <form>
                <label>Choose Table: </label>
                <select
                  defaultValue={Global_var}
                  onChange={(value) => {
                    Setvar(parseInt(value.currentTarget.value));
                    parseInt(value.currentTarget.value)
                      ? Setbox(parseInt(value.currentTarget.value))
                      : Setbox(3);
                  }}
                >
                  {[3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                  <option value={0}>Other</option>
                </select>
                {Global_var ? (
                  ""
                ) : (
                  <div>
                    <label>Put a number: </label>
                    <input
                      type="number"
                      min={3}
                      value={box_}
                      onChange={(e) => {
                        if (
                          parseInt(e.target.value) < 3 &&
                          e.target.value != ""
                        ) {
                          alert("Please put a number at least 3");
                        }
                        Setbox_(parseInt(e.target.value));
                        Setbox(
                          parseInt(e.target.value) <= 3
                            ? 3
                            : parseInt(e.target.value)
                        );
                      }}
                    />
                  </div>
                )}
                <br />
                <br />
                <label>Start with: </label>
                <select defaultValue={'X'}
                  onChange={(value) => {
                    setDefault(value.currentTarget.value)
                  }}>
                  {
                  ['X','O'].map((i=>(
                    <option value={i} key={i}>{i}</option>
                  )))
                  }
                </select>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
