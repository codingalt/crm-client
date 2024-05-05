import React from 'react'
import css from "./Statistics.module.scss";

const BottomCard = () => {
  return (
    <>
      {/* First Main Card  */}
      <div className={css.cardBottom}>
        <div className={css.subCard}>
          <h3>Percent</h3>
          <span>Cancellations</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>5%</p>
          </div>
        </div>

        <div className={css.subCard}>
          <h3>Appointment Cancelled</h3>
          <span>Most</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Haircut For a Man</p>
          </div>
        </div>

        <div className={css.subCard}>
          <h3>Best Turn </h3>
          <span>Sold</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Queue Description</p>
          </div>
        </div>

        <div className={css.subCard}>
          <h3>The Fast Queue</h3>
          <span>Most</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Queue Description</p>
          </div>
        </div>

        <div className={css.subCard}>
          <h3>The Space Queue</h3>
          <span>Most</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Queue Description</p>
          </div>
        </div>

      </div>

      {/* Second Main Card  */}
      {/* <div className={css.cardBottom}>
        <div className={css.subCard}>
          <h3>Best Turn </h3>
          <span>Sold</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Queue Description</p>
          </div>
        </div>

        <div className={css.subCard}>
          <h3>The Fast Queue</h3>
          <span>Most</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Queue Description</p>
          </div>
        </div>

        <div className={css.subCard}>
          <h3>The Space Queue</h3>
          <span>Most</span>
          <div className={css.line}></div>
          <div className={css.value}>
            <p>Queue Description</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default BottomCard