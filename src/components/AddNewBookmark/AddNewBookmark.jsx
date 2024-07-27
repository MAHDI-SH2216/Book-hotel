import axios from "axios";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import { useBookMark } from "../context/BookMarkListContext";
import useUrlLocation from "./../../hooks/useLAT&LNG";
const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeocodingError] = useState(null);
  const { createBookmark } = useBookMark();

  // const { data } = useFetchData(
  //   `${BASE_GEOCODING_URL}`,
  //   `latitude=${lat}&longitude=${lng}`
  // );
  // useEffect(() => {
  //   setCityName(data.city);
  //   setCountry(data.countryName);
  // }, [data.city, data.countryName]);
  useEffect(() => {
    if (!lat || !lng) return;
    setIsLoadingGeocoding(true);
    setGeocodingError(null);
    async function getFetch() {
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This Location is not city! please click somewhere else ."
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    getFetch();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      host_location: cityName + "" + country,
      latitude: lat,
      longitude: lng,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  }

  if (isLoadingGeocoding) return <p>Loading ...</p>;
  if (geoCodingError) return <p>{geoCodingError}</p>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            value={cityName}
            type="text"
            name="cityName"
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            type="text"
            name="country"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr;Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
