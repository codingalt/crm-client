import css from "./Services.module.scss";
import React from "react";
import { HiPencil } from "react-icons/hi2";
import { FiCopy } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const Card = () => {
  return (
    <div className={`${css.card} shadow-lg border`}>
      <header>
        <div className={css.left}>
          <p>Hair Cut</p>
          <HiPencil />
        </div>
        <div className={css.icon}>
          <FiCopy />
        </div>
      </header>

      {/* Tags  */}
      <div className={css.tags}>
        <div className={css.tag}>
          <p>Short hair</p>
        </div>
        <div className={css.tag}>
          <p>Draft</p>
        </div>
      </div>

      <div className={css.user}>
        <FaUser />
        <p>Faheem Malik</p>
      </div>

      <div className={css.timeInfo}>
        <div className={css.left}>
            <MdAccessTime />
            <span>30 mints</span>
        </div>
        <div className={css.right}>20 Nis</div>
      </div>

      <div className={css.actions}>
        <p>Remarks</p>
        <FaRegTrashAlt />
      </div>


    </div>
  );
};

export default Card;
