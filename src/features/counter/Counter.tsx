import React, { useState, memo } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  userNameUpdated,
  selectUserName,
  selectWeirdName,
} from "./counterSlice";
import styles from "./Counter.module.css";

const ChildWithName = memo(() => {
  const name = useAppSelector(selectUserName);

  return (
    <>
      <p>Name: {name}</p>
    </>
  );
});

const ChildWithWeirdName = memo(() => {
  const weirdName = useAppSelector(selectWeirdName).newName;

  return (
    <>
      <p>Name from memoized selector: {weirdName}</p>
    </>
  );
});

export function Counter() {
  const count = useAppSelector(selectCount);
  const weirdName = useAppSelector(selectWeirdName);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <ChildWithName />
      <ChildWithWeirdName />

      <button onClick={() => dispatch(userNameUpdated())}>Update name</button>

      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
