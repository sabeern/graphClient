import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { instance } from "./config/baseUrl";

function App() {
  const [graphData, setGraphData] = useState();
  const fetchGraphData = async () => {
    try {
      let result = await instance.get("/graph/graphData");
      let newData = result.data.map((val) => {
        return {
          x: new Date(val.date),
          y: [val.open, val.high, val.low, val.close],
        };
      });
      setGraphData({
        series: [
          {
            data: [...newData],
          },
        ],
        options: {
          chart: {
            type: "candlestick",
            height: 350,
          },
          title: {
            text: "Nifty 50 Index . 1D . NSE",
            align: "left",
          },
          xaxis: {
            labels: {
              format: "MMM",
            },
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchGraphData();
  }, []);
  return (
    <>
      {graphData && (
        <div id="nifty">
          <ReactApexChart
            options={graphData.options}
            series={graphData.series}
            type="candlestick"
            height={350}
          />
        </div>
      )}
    </>
  );
}

export default App;
