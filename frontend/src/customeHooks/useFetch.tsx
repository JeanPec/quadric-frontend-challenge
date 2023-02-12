import { useState, useEffect } from "react";
import axios from "axios";
import { readFromCache, writeToCache } from "../utils/cache";

interface useFetchProps {
  endpoint: string,
  writeToCacheBoolean?: boolean,
}

/*
    useFetch:
        - Custom Hook to get the info from each endpoint
        - use LocalStorage to read from cache at first (enhances UX) then update with the querry call
 */

export const useFetch = ({endpoint, writeToCacheBoolean = true}: useFetchProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if(readFromCache(`http://localhost:3001/${endpoint}`)) setData(readFromCache(`http://localhost:3001/${endpoint}`));
    axios
      .get(`http://localhost:3001/${endpoint}`)
      .then((response) => {
        setData(response.data);
        if(writeToCacheBoolean) writeToCache(`http://localhost:3001/${endpoint}`, response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [endpoint, writeToCacheBoolean]);

  return {data, loading, error};
};
