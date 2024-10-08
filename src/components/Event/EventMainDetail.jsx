/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEvent, joinEvent } from "../../api/axios";
import { Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../common/Spinner";

const EventMainDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {event && (
        <>
          <Card>
            <Card.Body>
              <Card.Title>Event Name: {event.name}</Card.Title>
              <Card.Text>Event Description: {event.description}</Card.Text>
              <Card.Text>Event status: {event.status}</Card.Text>
              <Card.Text>
                Event Date: {new Date(event.date).toLocaleDateString()}
              </Card.Text>
              <Card.Text>Price: ${event.price}</Card.Text>
            </Card.Body>
          </Card>
          <h3>
            Please register{" "}
            <Link to="/eventee-signup" className="text-decoration-none">
              here
            </Link>{" "}
            to join the event <b>{event.name}</b>
          </h3>
        </>
      )}
    </div>
  );
};

export default EventMainDetail;
