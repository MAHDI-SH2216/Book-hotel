import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookMark } from "../context/BookMarkListContext";

function BookMarkLayout() {
  const { bookmarks } = useBookMark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={bookmarks} />
    </div>
  );
}

export default BookMarkLayout;
