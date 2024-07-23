import { createContext, useContext } from "react";
import useFetchData from "../../hooks/useFetchData";

const BASE_URL = " http://localhost:5000";

const BookMarkContext = createContext();

export default function BookMarkProvider({ children }) {
  const { loading, bookmarks } = useFetchData(`${BASE_URL}/bookmarks`);
  return (
    <BookMarkContext.Provider value={{ loading, bookmarks }}>
      {children}
    </BookMarkContext.Provider>
  );
}

export function useBookMark() {
  return useContext(BookMarkContext);
}
