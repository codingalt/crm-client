import React, { useEffect, useState } from 'react'
import css from "./Statistics.module.scss";


const TopCard = ({data}) => {

  return (
        <>
          <h3>{data.name}</h3>
          <div className={css.line}></div>
          <div className={css.time}>
            <p>{data.time}</p>
          </div>
        </>
  );
}

export default TopCard