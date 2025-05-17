const PreviewItem = ({ img, alt, clickButton = () => {} }) => {
  const clickHandler = () => {
    clickButton(img);
  };

  return (
    <button
      className="flex items-center justify-center shrink-0 h-full aspect-square border border-black rounded-full overflow-hidden cursor-pointer"
      onClick={clickHandler}
    >
      {img ? (
        <img
          src={img}
          alt={alt}
          className="h-full w-full object-cover scale-200"
        />
      ) : (
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      )}
    </button>
  );
};

export default PreviewItem;
