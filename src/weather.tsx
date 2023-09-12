import { useState, useEffect } from "react";
import "./weather.css";
import day from "./image/sun-behind-clouds-7.jpg";
import night from "./image/139731-sky-clouds-stars.jpg";
import none from "./image/Climate-Weather-Blue-Clouds-1280px.jpg";
import { FiRefreshCw } from "react-icons/fi";
export default function Weather() {
  const [location, setlocation] = useState<any | undefined>();
  const [input, setinput] = useState("");
  const [loading, setloading] = useState(false);
  const [bgImg, setbgImg] = useState("");
  async function getdata() {
    setloading(true);
    await fetch(
      `http://api.weatherapi.com/v1/current.json?key=d8473defb32d4970b21101125230708&q=${input}&aqi=no`
    )
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setlocation(data);
          console.log(location);
        } else {
          alert("!");
        }
      })
      .catch((err) => {
        console.error(err);
        setlocation(undefined);
      });
    setloading(false);
  }

  useEffect(() => {
    if (!location) {
      setbgImg(none);
    } else {
      if (location.current.is_day === 1) {
        setbgImg(day);
      } else {
        setbgImg(night);
      }
    }
  }, [location]);

  return (
    <div className="koll" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="inps">
        <input
          className="myinp"
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getdata();
          }}
          className="mybtn"
        >
          {" "}
          {loading ? <>loading...</> : <> هواش چطوره؟</>}{" "}
        </button>
        <button
          className="mybtn"
          onClick={() => {
            getdata();
          }}
        >
          {" "}
          <FiRefreshCw />{" "}
        </button>
      </div>
      {location && (
        <div className="infs">
          <p>
            {location.location.country}_{location.location.name}
          </p>
          <p>{location.current.condition.text}</p>
          <img src={location.current.condition.icon}></img>
          <p>{location.current.temp_c}°c</p>
          <p>Date and time : {location.current.last_updated}</p>
        </div>
      )}
    </div>
  );
}
