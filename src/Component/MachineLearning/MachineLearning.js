import "../../ComponentStyle/MachineLearningStyle/MachineLearning.css";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export default function MachineLearning() {
  return (
    <header className="App-machineLearning">
      <h1>Machine Learning Hub</h1>
      <MachineL1 />
    </header>
  );
}

function MachineL1() {
  useEffect(() => {
    let runScript = async () => {
      run();
    };
    runScript();
  }, []);

  async function getData() {
    const carsDataResponse = await fetch(
      "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
    );
    const carsData = await carsDataResponse.json();
    const cleaned = carsData
      .map((car) => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
      }))
      .filter((car) => car.mpg != null && car.horsepower != null);

    return cleaned;
  }

  async function run() {
    // Load and plot the original input data that we are going to train on.
    const data = await getData();
    const values = data.map((d) => ({
      x: d.horsepower,
      y: d.mpg,
    }));
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Horsepower",
            data: values,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Horsepower",
            },
          },
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "MPG",
            },
          },
        },
      },
    });
  }

  return (
    <div className="machineL1">
      <canvas id="myChart"></canvas>
    </div>
  );
}
