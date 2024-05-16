import React from "react";
import css from "./BusinessProfile.module.scss";
import { RiFireFill } from "react-icons/ri";
import ImageComponent from "../ui/Image/ImageComponent";
import s1 from "../../assets/h3.jpg";
import s2 from "../../assets/h2.jpg";
import s3 from "../../assets/h4.jpg";
import s4 from "../../assets/h1.jpg";

const Services = () => {
  return (
    <div
      className={`${css.cards} grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5`}
    >
      <div className={css.card}>
        <div className={css.left}>
          <div className={css.name}>Pancakes</div>
          <div className={css.price}>Rs. 695</div>
          <div className={css.desc}>
            Fresh & fluffy pancakes. Served with a topping of your choice
          </div>
        </div>
        <div className={css.right}>
          <div className={css.img}>
            <ImageComponent src={s1} radius={"8px"} />
          </div>
        </div>
      </div>

      <div className={css.card}>
        <div className={css.left}>
          <div className={css.name}>Signature Sandwitch</div>
          <div className={css.price}>Rs. 899</div>
          <div className={css.desc}>
            Fresh & fluffy pancakes. Served with a topping of your choice
          </div>
        </div>
        <div className={css.right}>
          <div className={css.img}>
            <ImageComponent src={s2} radius={"8px"} />
          </div>
        </div>
      </div>

      <div className={css.card}>
        <div className={css.left}>
          <div className={css.name}>Loaded Fries</div>
          <div className={css.price}>Rs. 530</div>
          <div className={css.desc}>
            Fresh & fluffy pancakes. Served with a topping of your choice
          </div>
        </div>
        <div className={css.right}>
          <div className={css.img}>
            <ImageComponent src={s3} radius={"8px"} />
          </div>
        </div>
      </div>

      <div className={css.card}>
        <div className={css.left}>
          <div className={css.name}>Great Grilled Burger</div>
          <div className={css.price}>Rs. 950</div>
          <div className={css.desc}>
            Fresh & fluffy pancakes.
          </div>
        </div>
        <div className={css.right}>
          <div className={css.img}>
            <ImageComponent src={s4} radius={"8px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
