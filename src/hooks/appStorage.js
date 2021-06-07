import { useState, useEffect } from "react";

function useLocalStorage(tkn, firstValue = null) {
  const initialValue = localStorage.getItem(tkn) || firstValue;

  const [data, setData] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {

    if (data === null) {
      localStorage.removeItem(tkn);
    } else {
      localStorage.setItem(tkn, data);
    }
  }, [tkn, data]);

  return [data, setData];
}

export default useLocalStorage;
