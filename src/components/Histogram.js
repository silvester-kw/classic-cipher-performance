import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const calculateAlphabetDistribution = (text) => {
  const frequency = Array(26).fill(0);

  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");

  cleanText.split("").forEach((char) => {
    const index = char.charCodeAt(0) - 65;
    if (index >= 0 && index < 26) {
      frequency[index]++;
    }
  });

  const total = cleanText.length;

  const relativeFrequency = frequency.map((count) => (count / total) * 100);

  return relativeFrequency;
};

const calculateChiSquared = (observed, expected) => {
  return observed.reduce((chiSq, obsFreq, i) => {
    const expFreq = expected[i];
    return chiSq + Math.pow(obsFreq - expFreq, 2) / expFreq;
  }, 0);
};

const calculateSecrecyValue = (distribution) => {
  const englishFrequencies = [8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.2, 0.8, 4.0, 2.4, 6.7, 7.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4, 0.2, 2.0, 0.1];

  const chiSquared = calculateChiSquared(distribution, englishFrequencies);

  const secrecyValue = chiSquared / distribution.length;
  return secrecyValue.toFixed(2);
};

const Histogram = ({ ciphertext }) => {
  const distribution = calculateAlphabetDistribution(ciphertext);

  const secrecyValue = calculateSecrecyValue(distribution);

  const chartData = {
    labels: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    datasets: [
      {
        label: "Char Freq Distribution (%)",
        data: distribution,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Alphabet Relative Frequency Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Alphabet Characters (A-Z)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Relative Frequency (%)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
      <div className="mt-4 text-center rounded bg-slate-200">
        <strong>Secrecy Value:</strong> {secrecyValue}
      </div>
    </div>
  );
};

export default Histogram;
