import { useEffect, useState } from "react";
import { getUserEvents, setReminder } from "../../api/axios";
import { Card, Button, Form, Modal } from "react-bootstrap";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { Link, useParams } from "react-router-dom";
import Spinner from "../common/Spinner";

// Retrieves event ID from URL

const UserEvents = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [reminderDate, setReminderDate] = useState("");

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserEvents(token);
        setEvents(data.message);
        setIsLoading(true);
        setQrCode(data.qrCode);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  const handleShowReminderForm = (eventId) => {
    setSelectedEventId(eventId);
    setShowReminderForm(true);
  };

  const handleCloseReminderForm = () => {
    setShowReminderForm(false);
    setReminderDate("");
  };

  const handleSubmitReminder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Event ID:", selectedEventId); // Log event ID
      console.log("Reminder Date:", reminderDate);

      const response = await setReminder(selectedEventId, reminderDate, token); // Use the selected event ID
      console.log("Response from API:", response);

      alert("Reminder set successfully!");
      handleCloseReminderForm();
    } catch (error) {
      console.error("Error setting reminder:", error);
      alert("Failed to set reminder.");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center color-black">My Events</h2>
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
      {events.length ? (
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4" key={event._id}>
              <Card className="mb-4">
                <Card.Body className="font-size-5">
                  <Card.Title>Name of Event: {event.name}</Card.Title>
                  <Card.Text>
                    Description of Event: {event.description}
                  </Card.Text>
                  <Card.Text>Event status: {event.status}</Card.Text>
                  <Card.Text>
                    Date of Event: {new Date(event.date).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>Price: ${event.price}</Card.Text>

                  <Card.Text className="text-center">
                    QR CODE: <img src={qrCode} alt="QR Code" />
                  </Card.Text>
                  <Card.Text className="text-center">
                    Scan me to get this event details
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <Button
                      className="me-2"
                      onClick={() => handleShowReminderForm(event._id)} // Set the event ID for reminder
                    >
                      Set Reminder
                    </Button>
                    <div className="d-flex">
                      <FacebookShareButton
                        url={`https://eventful-zeta.vercel.app/events-detail/${event._id}`}
                        quote={`I just got registered for the event ${
                          event.name
                        }, happening on ${new Date(
                          event.date
                        )}. You can check it out also`}
                        hashtag="#EventShare"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`https://eventful-zeta.vercel.app/events-detail/${event._id}`}
                        title={`I just got registered for the event ${
                          event.name
                        }, happening on ${new Date(
                          event.date
                        )}. You can check it out also`}
                        hashtags={["Eventful"]}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <h5>
          This user has not signed up for any event, Go to the Available Events
          and sign up for an event
        </h5>
      )}

      {/* Reminder Form Modal */}
      <Modal show={showReminderForm} onHide={handleCloseReminderForm}>
        <Modal.Header closeButton>
          <Modal.Title>Set Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitReminder}>
            <Form.Group controlId="formReminderDate">
              <Form.Label>Reminder Date</Form.Label>
              <Form.Control
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Set Reminder
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserEvents;
