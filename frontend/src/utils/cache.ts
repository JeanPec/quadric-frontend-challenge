/*
    cache:
        - function to interract with LocalStorage
 */

const writeToCache = (url: string, data: any) =>
  localStorage.setItem(url, JSON.stringify(data));

const readFromCache = (url: string) => {
  const data = localStorage.getItem(url);
  if (data) return JSON.parse(data);
  return null;
};

export { readFromCache, writeToCache };
