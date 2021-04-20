import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";

const Heatmap = dynamic(() => import("@ant-design/charts/lib/heatmap"));

export const HeatmapInsightComponent: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  console.log(data);
  const config = {
    data: data,
    xField: "Month of Year",
    yField: "District",
    colorField: "AQHI",
    color: ["#174c83", "#7eb6d4", "#efefeb", "#efa759", "#9b4d16"],
  };
  return <Heatmap {...config} />;
};
