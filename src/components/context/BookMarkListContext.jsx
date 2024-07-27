import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

const BookMarkContext = createContext();

const initialState = {
  bookmarks: [],
  loading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReduser(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "bookmark/loaded":
      return { ...state, loading: false, currentBookmark: action.payload };
    case "bookmarks/loaded":
      return { ...state, loading: false, bookmarks: action.payload };
    case "bookmark/created":
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        loading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("Unknown Action");
  }
}

export default function BookMarkProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [bookmarks, setBookmark] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [{ bookmarks, loading, currentBookmark }, dispatch] = useReducer(
    bookmarkReduser,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an error occurred in loading  bookmarks",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an error occurred in fetching single bookmark",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookMarkContext.Provider
      value={{
        loading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
}

export function useBookMark() {
  return useContext(BookMarkContext);
}
