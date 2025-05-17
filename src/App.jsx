import { useRef, useState } from "react";
import "./App.css";

import ItemBar from "./components/ItemsBar";
import MainHistory from "./components/MainHistory";
import { getFromStorage, saveInStorage } from "./services/storage";
import { useEffect } from "react";

function App() {
  const inputFile = useRef(null);

  const [histories, setHistories] = useState([]);
  const [items, setItems] = useState(null);

  useEffect(() => {
    syncFromStorage();
  }, []);

  const clickCircleHandler = (history) => {
    setItems(history);
  };

  const clickAddHandler = () => {
    inputFile.current.click();
  };

  const changeInputHandler = async (ev) => {
    await saveInStorage(ev.target.files);

    syncFromStorage();
  };

  const syncFromStorage = () => {
    const dataFromStorage = getFromStorage();

    setHistories(dataFromStorage);
  };

  return (
    <>
      <input
        type="file"
        accept=".jpg,.png"
        className="hidden"
        multiple={true}
        ref={inputFile}
        onChange={changeInputHandler}
      />
      <ItemBar
        histories={histories}
        clickCircleHandler={clickCircleHandler}
        clickAddHandler={clickAddHandler}
      />

      {items ? <MainHistory items={items} /> : null}
    </>
  );
}

export default App;
