import React, { useState, useEffect } from "react";

import ss from './index.module.scss';

export interface CountDownProps {
  time: number;
  onEnd?: () => void;
}

const CountDown = (props: CountDownProps) => {
  const { time, onEnd } = props;
  const [ count, setCount ] = useState(time || 60);

  useEffect(() => {
    const id = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
      if (count === 0) {
        clearInterval(id);
        onEnd && onEnd();
      }
    }, 1000);
    return () => {
      clearInterval(id);
    }
  }, [count, onEnd]);

  return (
    <div className={ss.CountDown}>{count}</div>
  )
};

export default CountDown;