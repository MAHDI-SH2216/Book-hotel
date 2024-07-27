import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookMark } from "../context/BookMarkListContext";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currentBookmark, loading } = useBookMark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (loading || !currentBookmark) return <p>loading ...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; BACK
      </button>
      <div>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
