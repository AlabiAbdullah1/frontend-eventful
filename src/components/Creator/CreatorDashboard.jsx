import { useEffect, useState, useCallback } from "react";
import { deleteEvent, getCreatorEvents } from "../../api/axios";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../common/Spinner";

const CreatorDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchUserEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getCreatorEvents(token);
      setEvents(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);

  const handleDelete = async (eventId) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await deleteEvent(eventId, token);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      toast.success("event deleted successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = (eventId) => {
    navigate(`/events/update/${eventId}`);
  };

  const renderEventCard = (event) => (
    <div className="col-md-4" key={event._id}>
      <Card className="mb-4">
        <Card.Body>
          <Link to={`/user/analytic`} className="text-decoration-none">
            <Card.Title>Event Name: {event.name}</Card.Title>
            <Card.Text>Description: {event.description}</Card.Text>
            <Card.Text>Status: {event.status}</Card.Text>
            <Card.Text>
              Date: {new Date(event.date).toLocaleDateString()}
            </Card.Text>
            <Card.Text>Price: ${event.price}</Card.Text>
          </Link>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" onClick={() => handleUpdate(event._id)}>
              Update
            </Button>
            <Button
              disabled={isSubmitting}
              variant="danger"
              onClick={() => handleDelete(event._id)}
            >
              {isSubmitting ? <Spinner /> : "Delete"}
            </Button>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <FacebookShareButton
              url={`https://eventful-zeta.vercel.app/events-detail/${event._id}`}
              quote={`Check out this event: ${event.name}`}
              hashtag="#EventShare"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://eventful-zeta.vercel.app/events-detail/${event._id}`}
              title={`Check out this event: ${event.name}`}
              hashtags={["EventShare"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className="container mt-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <HeaderSection />
      {error ? (
        <NoEventsMessage />
      ) : (
        <div className="row">{events.map(renderEventCard)}</div>
      )}
      <CreateEventButton />
    </div>
  );
};

const HeaderSection = () => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>My Events</h2>
    <div>
      <Link to="/user/analytic">
        <Button className="me-2">Your Event Analysis</Button>
      </Link>
      <Link to="/">
        <Button>Go to the homepage</Button>
      </Link>
    </div>
  </div>
);

const NoEventsMessage = () => (
  <h5>
    This Creator has no created Event. Please create an event to get started
  </h5>
);

const CreateEventButton = () => (
  <div className="d-flex justify-content-center mt-4">
    <Link className="text-decoration-none" to="/events/create">
      <Button size="lg">Create Event</Button>
    </Link>
  </div>
);

export default CreatorDashboard;
