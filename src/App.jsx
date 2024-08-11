import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
import CreateEvent from "./components/Event/CreateEvent";
import EventList from "./components/Event/EventList";
import EventDetail from "./components/Event/EventDetail";
import UserEvents from "./components/User/UserEvents";
import Homepage from "./components/common/Homepage";
import CreatorSignup from "./components/Creator/CreatorSignup";
import CreatorLogin from "./components/Creator/CreatorLogin";
import EventeeSignup from "./components/User/EventeeSignup";
import EventeeLogin from "./components/User/EventeeLogin";
import CreatorDashboard from "./components/Creator/CreatorDashboard";
import Dashboard from "./components/User/Dashboard";
import Analytics from "./components/Creator/Analytic";
import PageNotFound from "./components/common/PageNotFound";
import UpdateEvent from "./components/Creator/updateEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="creator-signup" element={<CreatorSignup />} />
        <Route path="creator-login" element={<CreatorLogin />} />
        <Route path="eventee-signup" element={<EventeeSignup />} />
        <Route path="eventee-login" element={<EventeeLogin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/update/:id" element={<UpdateEvent />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/user/events" element={<UserEvents />} />
        <Route path="/user/analytic" element={<Analytics />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
