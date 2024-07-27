import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AppLayout from "./components/AppLayout/AppLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import AuthProvider from "./components/context/AuthProvider";
import BookMarkProvider from "./components/context/BookMarkListContext";
import HotelProvider from "./components/context/HotelProvider";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList/LocationList";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import SingleHotel from "./components/SingleHotel/SingleHotel";

function App() {
  return (
    <AuthProvider>
      <BookMarkProvider>
        <HotelProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookMarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelProvider>
      </BookMarkProvider>
    </AuthProvider>
  );
}

export default App;
