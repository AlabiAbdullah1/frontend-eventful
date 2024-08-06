import { useEffect, useState } from "react";
import { getCreatorEvents } from "../../api/axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

const CreatorDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getCreatorEvents(token);
        console.log(data);
        setEvents(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserEvents();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Events</h2>
        <div>
          <Link to="/user/analytic">
            <Button className="me-2">Your EventAnalysis</Button>
          </Link>
          <Link to="/">
            <Button>Go to the homepage</Button>
          </Link>
        </div>
      </div>
      {error && (
        <h5>
          This Creator has no created Event. Please create an event to get
          started
        </h5>
      )}
      {events ? (
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4" key={event._id}>
              <Link to={`/user/analytic`} className="text-decoration-none">
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Event Name: {event.name}</Card.Title>
                    <Card.Text>
                      Event Description: {event.description}
                    </Card.Text>
                    <Card.Text>Event status: {event.status}</Card.Text>
                    <Card.Text>
                      Date of Event: {new Date(event.date).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>Price: ${event.price}</Card.Text>
                    <div className="d-flex justify-content-end">
                      <FacebookShareButton
                        url={`http://localhost:5173/events/${event._id}`}
                        quote={`Check out this event: ${event.name}`}
                        hashtag="#EventShare"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`http://localhost:5173/events/${event._id}`}
                        title={`Check out this event: ${event.name}`}
                        hashtags={["EventShare"]}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h5>
          This Creator has no created Event. Please create an event to get
          started
        </h5>
      )}
      <div className="d-flex justify-content-center mt-4">
        <Link className="text-decoration-none" to="/events/create">
          <Button size="lg">Create Event</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreatorDashboard;
