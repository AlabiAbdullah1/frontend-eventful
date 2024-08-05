import { useEffect, useState } from "react";
import { getAnalytics } from "../../api/axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAnalytics(token);
        setAnalytics(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserEvents();
  }, []);

  return (
    <div className="container mt-5">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Your Event Analysis</h1>
        <Link to="/creator-dashboard">
          <Button>My Events</Button>
        </Link>
      </div>
      <div className="row">
        {analytics.map((analysis, index) => (
          <div className="col-md-4" key={index}>
            <Card className="mb-4">
              <Card.Body>Event Attenders: {analysis.eventAttender}</Card.Body>
              <Card.Body>
                Tickets Bought: {analysis.numberOfTicketsBought}
              </Card.Body>
              <Card.Body>
                QR CODE: <img src={analysis.qrCode} alt="QR Code" />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
