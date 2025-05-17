import { useState } from "react";

import "./style.css";

import BulletTime from "../BulletTime";
import { useEffect } from "react";
import { useRef } from "react";

const MainHistory = ({ items }) => {
  const leftButton = useRef();
  const rightButton = useRef();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function keypressHandler(ev) {
      if (ev.keyCode === 37) leftButton.current.click();
      if (ev.keyCode === 39) rightButton.current.click();
    }

    document.addEventListener("keydown", keypressHandler);

    return () => {
      document.removeEventListener("keydown", keypressHandler);
    };
  }, []);

  useEffect(() => {
    setSelected({ data: items[0], index: 0 });
  }, [items]);

  const goToNextHandler = (index) => {
    const nextIndex = index + 1;

    if (nextIndex >= items.length) return;

    setSelected({ data: items[nextIndex], index: nextIndex });
  };

  const goToPrevHandler = (index) => {
    const prevIndex = index - 1;

    if (prevIndex < 0) return;

    setSelected({ data: items[prevIndex], index: prevIndex });
  };

  return selected ? (
    <>
      <div className="mt-4">
        <div className="flex justify-center gap-0.5 h-2 w-full px-10 md:px-40 ">
          {items?.map(({ id }, index) => (
            <BulletTime
              key={id}
              isCurrent={id === selected.data?.id}
              completed={index < selected.index}
              endTimeHandler={() => goToNextHandler(index)}
            />
          ))}
        </div>
      </div>

      <section className="relative grow mt-4">
        <div
          className="absolute h-full w-full blur-md"
          style={{
            background: `url(${selected.data.img}) no-repeat center / cover`,
          }}
        ></div>

        <img
          src={selected.data.img}
          alt={selected.text}
          className="absolute h-11/12 top-1/2 left-1/2 -translate-1/2 drop-shadow-[2px_4px_6px_rgba(0,0,0,.25)] max-w-11/12 object-contain"
        />

        <button
          className="absolute top-1/2 left-[2%] p-1 opacity-30 hover:opacity-100 duration-500 ease-in-out cursor-pointer hover:shadow rounded-sm"
          ref={leftButton}
          onClick={() => goToPrevHandler(selected.index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          className="absolute top-1/2 right-[2%] p-1 opacity-30 hover:opacity-100 duration-500 ease-in-out cursor-pointer hover:shadow rounded-sm"
          ref={rightButton}
          onClick={() => goToNextHandler(selected.index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </section>
    </>
  ) : null;
};

export default MainHistory;
