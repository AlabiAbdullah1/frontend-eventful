import { useQuery } from "@tanstack/react-query";
import Spinner from "../common/Spinner";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/axios";
import { Card, Button } from "react-bootstrap";

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await getEvents();
    },
    staleTime: 4000,
  });

  if (isLoading) return <Spinner />;
  if (error) return toast.error("Error Loading the Data");

  // Check if data.message is an array before using .map()
  const events = data || [];

  if (!Array.isArray(events)) {
    return <div>Data is not an array</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <ToastContainer />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-center">LIST OF ALL AVAILABLE EVENTS</h2>
          <div>
            <Link to="/user/events">
              <Button className="me-2">Your Events</Button>
            </Link>

            <Link to="/">
              <Button>Go to the homepage</Button>
            </Link>
          </div>
        </div>
        {events && (
          <div className="row">
            {events.map((event) => (
              <div className="col-md-4" key={event._id}>
                <Link
                  to={`/events/${event._id}`}
                  className="text-decoration-none"
                >
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Name of Event: {event.name}</Card.Title>
                      <Card.Text>
                        Description of Event: {event.description}
                      </Card.Text>
                      <Card.Text>Event status: {event.status}</Card.Text>
                      <Card.Text>
                        Date of Event:
                        {new Date(event.date).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text>Price: ${event.price}</Card.Text>
                      <Card.Text>Creator Name: {event.creatorName}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
