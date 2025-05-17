import PreviewItem from "./PreviewItem";

const ItemBar = ({ histories, clickCircleHandler, clickAddHandler }) => {
  return (
    <>
      <header className="flex gap-2 md:gap-4 w-full h-20 p-2 md:p-4 border-b border-black max-w-screen">
        <PreviewItem clickButton={clickAddHandler} />

        <div className="flex gap-2 md:gap-4 grow h-full overflow-x-auto">
          {histories?.map((h) => (
            <PreviewItem
              key={h[0].id}
              img={h[0].img}
              alt={h[0].id}
              clickButton={() => clickCircleHandler(h)}
            />
          ))}
        </div>
      </header>
    </>
  );
};

export default ItemBar;
