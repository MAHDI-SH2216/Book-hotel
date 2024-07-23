import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelProvider";
function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, loadingCurrent, getHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (loadingCurrent || !currentHotel) return <p>loading ...</p>;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} Review &bull;{" "}
          {currentHotel.smart_location}
        </div>
      </div>
      <img src={currentHotel.thumbnail_url} alt={currentHotel.name} />
    </div>
  );
}

export default SingleHotel;
