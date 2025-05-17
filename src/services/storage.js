import { isMoreThan24h } from "./time";

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject;
  });

const filterStorage = (key) => {
  const timestamp = key.replace("H-", "").trim();

  if (!timestamp) return false;

  const isValid = !isMoreThan24h(Number(timestamp));

  if (!isValid) localStorage.removeItem(key);

  return isValid;
};

export const saveInStorage = async (files) => {
  const promiseList = Array.from(files).map((file) =>
    convertFileToBase64(file)
  );
  const imgs = await Promise.all(promiseList);

  const data = imgs.map((img) => {
    return {
      id: crypto.randomUUID(),
      img,
    };
  });

  const key = `H-${Date.now()}`;

  localStorage.setItem(key, JSON.stringify(data));

  return imgs;
};

export const getFromStorage = () => {
  const storageKeys = Object.keys(localStorage).filter((key) =>
    /^H-[0-9]+$/.test(key)
  );

  const histories = storageKeys
    .filter((key) => filterStorage(key))
    .sort()
    .reverse()
    .map((key) => {
      return JSON.parse(localStorage.getItem(key));
    });

  return histories;
};
