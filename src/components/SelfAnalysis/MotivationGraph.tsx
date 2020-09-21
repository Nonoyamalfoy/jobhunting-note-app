import React from "react";
import { Line } from "react-chartjs-2";

const myMotivations = [
  { title: "テニスと出会う", age: 5, motivation: 5 },
  { title: "怪我により２ヶ月間のドクターストップ", age: 10, motivation: 30 },
  { title: "復帰後の引退試合でメンバー入り", age: 15, motivation: 9 },
  { title: "志望大学に落ちる", age: 16, motivation: 80 },
  { title: "タイに旅行に行き、海外の魅力に気づく", age: 18, motivation: -30 },
  { title: "一週間の旅に出る", age: 20, motivation: 40 },
  { title: "帰国後現実とのギャップに苦しむ", age: 21, motivation: 10 },
  { title: "学生団体での活動に打ち込む", age: 22, motivation: 70 },
];

const getTitles = () => {
  const array = [];
  for (let i = 0; i < myMotivations.length; i++) {
    array[i] = myMotivations[i].title;
  }
  return array;
};

const getAges = () => {
  const array = [];
  for (let i = 0; i < myMotivations.length; i++) {
    array[i] = myMotivations[i].age;
  }
  return array;
};

const getMotivations = () => {
  const array = [];
  for (let i = 0; i < myMotivations.length; i++) {
    array[i] = myMotivations[i].motivation;
  }
  return array;
};

const data = {
  labels: getAges(),
  datasets: [
    {
      label: "モチベーション",
      // backgroundColor: "#008080",
      borderColor: "#20295f",
      pointBorderWidth: 10,
      data: getMotivations(),

    },
  ],
};

const options = {
  // events: ["click"],
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true,
          max: 100,
        },
      },
    ],
  },
  tooltips: {
    displayColors: false,
    callbacks: {
      title: (tooltipItems: any, data: any) => "",
      beforeLabel: (tooltipItems: any, data: any) => {
        return `${getAges()[tooltipItems.index]}歳`;
      },
      label: (tooltipItems: any, data: any) => {
        return getTitles()[tooltipItems.index];
      },
    },
  },
};

const MotivationGraph: React.FC = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default MotivationGraph;
