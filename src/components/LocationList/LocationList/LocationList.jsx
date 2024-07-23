import useFetchData from "../../../hooks/useFetchData";
function LocationList() {
  const { data, loading } = useFetchData("http://localhost:5000/hotels", "");
  if (loading) <p>Loading ...</p>;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>
      <div className="locationList">
      {data.map((item) => {
        return (
          <div className="locationItem" key={item.id}>
            <img src={item.thumbnail_url} alt={item.name} />
            <div className="locationItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </p>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default LocationList;
