import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useBookMark } from "../context/BookMarkListContext";

function Bookmark() {
  const { loading, bookmarks, currentBookmark, deleteBookmark } = useBookMark();
  if (loading || !bookmarks) return <p>loading ...</p>;

  async function handleDelete(e, id) {
    e.preventDefault();
    await deleteBookmark(id);
  }
  if(!bookmarks.length) return <p>there is no bookmark location</p>
  return (
    <div>
      <h2>BookMark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
