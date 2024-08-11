import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvent, getEvent } from "../../api/axios";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getEvent(id);

      // Format the date to yyyy-MM-dd
      const formattedDate = data.date
        ? new Date(data.date).toISOString().slice(0, 10)
        : "";

      setEvent({ ...data, date: formattedDate });
      setFormData({ ...data, date: formattedDate });
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      await updateEvent(id, formData, token);
      navigate("/creator-dashboard");
      toast.success("Event updated successfully");
    } catch (error) {
      toast.error("event date should not be in the past");
    }
  };

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
      <h2>Update Event</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Event Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Event
        </Button>
      </Form>
    </div>
  );
};

export default UpdateEvent;
