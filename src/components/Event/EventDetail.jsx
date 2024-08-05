import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEvent, joinEvent } from "../../api/axios";
import { Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../common/Spinner";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(id);
        setEvent(data);
        setError(null);
        setIsLoading(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token");
      await joinEvent(id);
      navigate("/user/events");
    } catch (error) {
      toast.error("You are already an attendee for this event");
      console.error("Error joining event", error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container mt-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-center">Event Details</h1>
        <div>
          <Link to="/dashboard">
            <Button className="me-2">Available Events</Button>
          </Link>
          <Link to="/user/events">
            <Button>Your Events</Button>
          </Link>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {event && (
        <Card>
          <Card.Body>
            <Card.Title>Event Name: {event.name}</Card.Title>
            <Card.Text>Event Description: {event.description}</Card.Text>
            <Card.Text>Event status: {event.status}</Card.Text>
            <Card.Text>
              Event Date: {new Date(event.date).toLocaleDateString()}
            </Card.Text>
            <Card.Text>Price: ${event.price}</Card.Text>
            <Button variant="primary" onClick={handleJoin}>
              Join Event
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default EventDetail;
