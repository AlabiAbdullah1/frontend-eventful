import { useEffect, useState } from "react";
import { getUserEvents } from "../../api/axios";
import { Card, Button } from "react-bootstrap";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [qrCode, setqrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserEvents(token);
        setEvents(data.message);
        setIsLoading(true);
        setqrCode(data.qrCode);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

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
                  <div className="d-flex justify-content-end">
                    <FacebookShareButton
                      url={`http://localhost:5173/events/${event._id}`}
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
                      url={`http://localhost:5173/events/${event._id}`}
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
    </div>
  );
};

export default UserEvents;
