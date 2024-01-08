import React from "react";
import Typical from "react-typical";

export default function SplashScreen() {
  return (
    <div className="splash">
      <h1 className="app--logo" style={{ fontSize: "2.5rem" }}>
        2D Game
      </h1>
      <div className="about-me">
        <img className="avatar" src="./hero2.svg" alt="Aung Ko" />
        <p className="my_name">Aung Ko</p>
        <b style={{ color: "#0f9de9" }}>
          I'm{" "}
          <Typical
            loop={Infinity}
            wrapper="b"
            steps={["Developer", 2000, "Designer (Wanna be)", 2000]}
          />
        </b>
      </div>

      <div className="spinner1"></div>
    </div>
  );
}
