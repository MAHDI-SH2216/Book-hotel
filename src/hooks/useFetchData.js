import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetchData(url, query = "") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}?${query}`, signal);
        setData(data);
      } catch (error) {
        setData([]);
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
    return () => {
      controller.abort();
    };
  }, [query, url]);
  return { data, loading };
}
