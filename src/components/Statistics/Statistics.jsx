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

const bottomData = [
  {
    heading: "Percent",
    subHeading: "Cancellations",
    value: "5%",
  },
  {
    heading: "Appointment Cancelled",
    subHeading: "Most",
    value: "Haircut For a Man",
  },
  {
    heading: "Best Turn",
    subHeading: "Sold",
    value: "Queue Description",
  },
  {
    heading: "The Fast Queue",
    subHeading: "Most",
    value: "Queue Description",
  },
  {
    heading: "The Space Queue",
    subHeading: "Most",
    value: "Queue Description",
  },
];

const config = { mass: 15, tension: 5000, friction: 300 };

const Statistics = () => {
  const [toggle, set] = useState(true);
  const [toggle2, set2] = useState(false);

  const trail = useTrail(topData ? topData.length : 0, {
    config,
    opacity: toggle ? 1 : 0,
    y: toggle ? 0 : 50,
    height: toggle ? 10 : 0,
    from: { opacity: 0, y: 50, height: 0 },
  });

  const trail2 = useTrail(topData ? topData.length : 0, {
    config,
    opacity: toggle2 ? 1 : 0,
    y: toggle2 ? 0 : 50,
    height: toggle2 ? 10 : 0,
    from: { opacity: 0, y: 50, height: 0 },
  });

  useEffect(()=>{
    setTimeout(() => {
      set2(true);
    }, 30);
  },[]);

  return (
    <div className={`${css.wrapper}`}>
      <div className={css.headingTop}>
        <h1>Statistics</h1>
        <div className={css.bottom}>
          <p>Visits</p>
        </div>
      </div>

      {/* Top Cards  */}
      <div
        className={`${css.topCards} grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}
      >
        {topData?.map((item, index) => {
          const x = trail[index]?.y;
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
      <div
        className={`${css.cardBottom} mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}
      >
        {bottomData?.map((item, index) => {
          const x = trail2[index]?.y;
          return (
            <a.div
              className={css.subCard}
              key={index}
              style={{
                transform: x ? x.to((x) => `translate3d(0,${x}px,0)`) : "none",
              }}
            >
              <BottomCard key={index} index={index} data={item} />
            </a.div>
          );
        })}
      </div>

      {/* Graph  */}
      <Graph />
    </div>
  );
};

export default Statistics;
