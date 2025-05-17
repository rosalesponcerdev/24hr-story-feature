import { useRef, useEffect } from "react";

const BulletTime = ({ isCurrent, completed, endTimeHandler = () => {} }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isCurrent) {
      timerRef.current && clearTimeout(timerRef.current);

      return;
    }

    timerRef.current = setTimeout(() => {
      endTimeHandler();
    }, 3000);

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isCurrent, endTimeHandler]);

  return (
    <div
      className={`control relative grow h-full rounded-md overflow-hidden bg-gray-500/25 ${
        isCurrent ? "control--active" : ""
      } ${completed ? "control--complete" : ""}`}
    ></div>
  );
};

export default BulletTime;
