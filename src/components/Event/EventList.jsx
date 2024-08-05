import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/axios";
import { Card, Button } from "react-bootstrap";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      console.log(data);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>
                  {new Date(event.date).toLocaleDateString()}
                </Card.Text>
                <Card.Text>Price: ${event.price}</Card.Text>
                <Link to={`/events/${event._id}`}>   
                  <Button variant="primary">View Event</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
