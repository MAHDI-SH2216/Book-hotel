import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import HotelProvider from "./components/context/HotelProvider";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList/LocationList";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarkProvider from "./components/context/BookMarkListContext";

function App() {
  return (
    <BookMarkProvider>
      <HotelProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookMarkLayout />}>
            <Route index element={<div>BookMarkList</div>} />
            <Route path="add" element={<div>add new bookMark</div>} />
          </Route>
        </Routes>
      </HotelProvider>
    </BookMarkProvider>
  );
}

export default App;
