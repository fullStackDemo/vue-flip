//store data to localStorage
export const saveLocalData = (key, value) => {
  const keys = Object.keys(localStorage);
  if (keys.includes(key)) {
    localStorage[key] = value;
  } else {
    localStorage.setItem(key, value);
  }
};