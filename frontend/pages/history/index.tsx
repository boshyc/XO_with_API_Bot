import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const index = (props: Props) => {
  const [data, setdata] = useState([]);
  const path = 'http://localhost:8000'

  const fetchData = async () => {
    const res = await axios.get(path)
    setdata(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [data]);

  return (
    <div className="body-index">
      <div>
        {data.map((i) =>
          i.isXwin != null && i.length != 0 || i.Start=='Draw' ? (
            <div className="win">
              <div>
                <label>
                  Game number:{!i.Gamenum ? "0" : i.Gamenum}{" "}
                  {
                    i.Start=='Draw'|| i.isXwin
                    ?
                       i.Start=='Draw'?'Draw!':'X won!'
                    :
                       "O won!"
                  }
                  
                </label>
              </div>
              <div className="button-replay">
                <Link href={`/replay/${i.Gamenum}`}>
                  <button>Replay</button>
                </Link>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default index;
