import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
const HotelContext = createContext();
const BASE_URL = " http://localhost:5000/hotels";
export default function HotelProvider({ children }) {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const [currentHotel, setCurrentHotel] = useState(null);
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, loading } = useFetchData(
    BASE_URL,
    `q=${destination || ""} &accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setLoadingCurrent(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setLoadingCurrent(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingCurrent(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{ loading, hotels, getHotel, currentHotel, loadingCurrent }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
