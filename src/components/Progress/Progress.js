import React, { useEffect } from "react";
import * as R from "react-bootstrap";
import "./Progress.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

function Progress(props) {
  useEffect(async () => {
    let res = await loadScript("https://code.jquery.com/jquery-3.5.1.min.js");
    res = await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/easy-pie-chart/2.1.6/jquery.easypiechart.min.js"
    );

    window.$(function () {
      window.$(".chart").easyPieChart({
        size: 160,
        barColor: props.color,
        scaleLength: 0,
        lineWidth: 15,
        trackColor: "rgb(236, 236, 236)",
        lineCap: "circle",
        animate: 2000,
      });
    });
  }, []);

  return (
    <R.Col xs={12} md={3} className="Progress">
      <div className="container">
        <div class="box">
          <div class="chart" data-percent={props.percent}>
            {props.price}
          </div>
          <h2>{props.tag}</h2>
        </div>
      </div>
    </R.Col>
  );
}

export default Progress;
