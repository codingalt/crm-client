import React from 'react'
import css from "./services.module.scss";
import { Skeleton } from '@/components/ui/skeleton';

const ServiceSkeleton = () => {
    const cardArray = new Array(12).fill(null);

  return (
    <>
      {cardArray?.map((_, index) => (
        <div
          key={index}
          className={`${css.card} pointer-events-none select-none`}
        >
          <div className={`${css.image} !border-none`}>
            <Skeleton className="h-full w-full" />
          </div>
          <div className={css.title}>
            <Skeleton className="h-3 w-4/5 rounded-lg mt-1" />
          </div>
          <div className={css.rating}>
            <Skeleton className="h-3 w-2/5 rounded-lg mt-2" />
          </div>
          <div className={css.detail}>
            <div className={css.age}></div>
            <div className={css.time}></div>
          </div>
          <div className={css.price}>
          </div>
        </div>
      ))}
    </>
  );
}

export default ServiceSkeleton