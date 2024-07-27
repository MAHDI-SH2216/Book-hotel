import { format } from "date-fns";
import { faIR } from "date-fns/esm/locale";
import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useOutsideClick from "../../hooks/UseOutsideClick";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOption] = useState({ adult: 1, children: 0, room: 1 });
  const navigate = useNavigate();
  function handleOptions(name, operation) {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  }
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  function handleSearch() {
    const enCodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: enCodedParams.toString(),
    });
  }
  return (
    <div className="header">
      <NavLink to={"bookmark"}>Bookmark</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            type="text"
            className="headerSearchInput"
            placeholder="Where to go ?"
            name="destination"
            id="destination"
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            id="DateRangecontroll"
            onClick={() => setOpenDate((is) => !is)}
            className="dateDropDown"
          >
            {`${format(date[0].startDate, "dd/MM/yyyy")} TO ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </div>
          <DateRangeControll
            date={date}
            setDate={setDate}
            openDate={openDate}
            setOpenDate={setOpenDate}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div onClick={() => setOpenOptions((is) => !is)} id="optionDropDown">
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function DateRangeControll({ openDate, setDate, date, setOpenDate }) {
  const dateRef = useRef();
  useOutsideClick(dateRef, "DateRangecontroll", () => setOpenDate(false));
  return (
    <div ref={dateRef}>
      {openDate && (
        <DateRange
          locale={faIR}
          className="date"
          ranges={date}
          onChange={(item) => setDate([item.selection])}
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
        />
      )}
    </div>
  );
}

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button onClick={() => logout()}>
            <HiLogout className="icon" />
          </button>
        </div>
      ) : (
        <div>
          <NavLink to={"/login"}>LOGIN</NavLink>
        </div>
      )}
    </div>
  );
}
