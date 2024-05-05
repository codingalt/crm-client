import React, { useEffect, useState } from "react";
import css from "./Statistics.module.scss";
import TopCard from "./TopCard";
import BottomCard from "./BottomCard";
import Graph from "./Graph";
import { useTrail, animated as a } from "@react-spring/web";

const topData = [
  {
    name: "Queue Time",
    time: "23 min",
  },
  {
    name: "Total Cancelation",
    time: "12",
  },
  {
    name: "Total Visits",
    time: "232",
  },
  {
    name: "Avg Visit Cost",
    time: "120 Nis",
  },
  {
    name: "Total Revenue",
    time: "120 Nis",
  },
];

const config = { mass: 15, tension: 5000, friction: 300 };

const Statistics = () => {
  const [toggle, set] = useState(true);

  const trail = useTrail(topData ? topData.length : 0, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 50,
    height: toggle ? 10 : 0,
    from: { opacity: 0, x: 50, height: 0 },
  });

  return (
    <div className={`${css.wrapper}`}>
      <div className={css.headingTop}>
        <h1>Statistics</h1>
        <div className={css.bottom}>
          <p>Visits</p>
        </div>
      </div>

      {/* Top Cards  */}
      <div className={`${css.topCards} grid grid-cols-1 md:grid-cols-5 gap-5`}>
        {topData?.map((item, index) => {
          const x = trail[index]?.x;
          return (
            <a.div
              className={css.cardTop}
              key={index}
              style={{
                transform: x ? x.to((x) => `translate3d(0,${x}px,0)`) : "none",
              }}
            >
              <TopCard key={index} data={item} />
            </a.div>
          );
        })}
      </div>

      {/* Bottom Cards  */}
      <div className="mt-6">
        <a.div
          style={{
            opacity: trail.opacity,
            transform: trail.x ? trail.x.to((x) => `translate3d(0,${x}px,0)`) : "none",
            height: trail.height,
          }}
        >
          <BottomCard />
        </a.div>
        {/* <BottomCard /> */}
      </div>

      {/* Graph  */}
      <Graph />
    </div>
  );
};

export default Statistics;
