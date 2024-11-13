import "../../ComponentStyle/MachineLearningStyle/MachineLearning.css";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";
import * as tf from "@tensorflow/tfjs";

export default function MachineLearning() {
  return (
    <header className="App-machineLearning">
      <h1>Machine Learning Hub</h1>
      <MachineL1 />
    </header>
  );
}

function MachineL1() {
  const [trainingEnded, setTrainingEnded] = useState(false);

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
    const data = await getData();
    const values = data.map((d) => ({
      x: d.horsepower,
      y: d.mpg,
    }));
    const ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
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

    setTrainingEnded(false);
    const model = createModel();
    const tensorData = convertToTensor(data);
    const { inputs, labels } = tensorData;
    await trainModel(model, inputs, labels);
    setTrainingEnded(true);
    testModel(model, data, tensorData);
  }

  function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
    model.add(tf.layers.dense({ units: 1, useBias: true }));
    return model;
  }

  function convertToTensor(data) {
    return tf.tidy(() => {
      tf.util.shuffle(data);

      const inputs = data.map((d) => d.horsepower);
      const labels = data.map((d) => d.mpg);

      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();

      const normalizedInputs = inputTensor
        .sub(inputMin)
        .div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor
        .sub(labelMin)
        .div(labelMax.sub(labelMin));

      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        inputMax,
        inputMin,
        labelMax,
        labelMin,
      };
    });
  }

  async function trainModel(model, inputs, labels) {
    model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
      metrics: ["mse"],
    });

    const batchSize = 32;
    const epochs = 50;

    let trainedModel = await model.fit(inputs, labels, {
      batchSize,
      epochs,
      shuffle: true,
    });

    const lossValues = trainedModel.history.loss;
    const mseValues = trainedModel.history.mse;

    const ctx = document.getElementById("trainChart").getContext("2d");
    let trainChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...Array(epochs).keys()],
        datasets: [
          {
            label: "Loss",
            data: lossValues,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "MSE",
            data: mseValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  function testModel(model, inputData, normalizationData) {
    const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

    const [xs, preds] = tf.tidy(() => {
      const xs = tf.linspace(0, 1, 100);
      const preds = model.predict(xs.reshape([100, 1]));

      const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);

      const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

      return [unNormXs.dataSync(), unNormPreds.dataSync()];
    });

    const predictedPoints = Array.from(xs).map((val, i) => {
      return { x: val, y: preds[i] };
    });

    const originalPoints = inputData.map((d) => ({
      x: d.horsepower,
      y: d.mpg,
    }));

    const ctx = document.getElementById("testChart").getContext("2d");
    let testChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Original Values",
            data: originalPoints,
          },
          {
            label: "Predicted Values",
            data: predictedPoints,
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

  let LoadingText = () => {
    return(<motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 360, 360, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{
        padding: "3vh"
      }}
    >
      Training model ...
    </motion.div>);
  }

  return (
    <div className="machineL1">
      <h2>The dataset</h2>
      <canvas id="myChart" className="dataCanvas"></canvas>
      <h2>Training the dataset</h2>
      <canvas id="trainChart" className="trainingCanvas"></canvas>
      {!trainingEnded && <LoadingText />}
      <h2>Expected Result</h2>
      <canvas id="testChart" className="testingCanvas"></canvas>
      {!trainingEnded && <LoadingText />}
    </div>
  );
}
