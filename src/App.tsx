import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import UserPicker from "./components/Users/UserPicker.tsx";
import BookingsPage from "./components/Bookings/BookigsPage.tsx";
import BookablesPage from "./components/Bookables/BookablesPage.tsx";
import UsersPage from "./components/Users/UsersPage.tsx";
import { UserProvider } from "./components/Users/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="App">
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt />
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen />
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <UserPicker />
            </header>

            <Routes>
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/bookables/*" element={<BookablesPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}
