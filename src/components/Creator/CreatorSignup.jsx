/* eslint-disable react/prop-types */
import PageNav from "../common/PageNav";
import Spinner from "../common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure to import the CSS

const CreatorSignupSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().default("creator"),
});

const CreatorSignupForm = ({ isSubmitting }) => (
  <>
    <h2>Creator Signup</h2>
    <Form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <Field type="text" id="name" name="name" className="form-control" />
        <ErrorMessage name="name" component="div" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <Field type="email" id="email" name="email" className="form-control" />
        <ErrorMessage name="email" component="div" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <Field
          type="text"
          id="role"
          name="role"
          value="creator"
          readOnly
          className="form-control"
        />
        <ErrorMessage name="role" component="div" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <Field
          type="password"
          id="password"
          name="password"
          className="form-control"
        />
        <ErrorMessage name="password" component="div" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <Field
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-control"
        />
        <ErrorMessage
          name="confirmPassword"
          component="p"
          className="text-danger"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Signup"}
        </button>
        <p>
          Already a user? <Link to="/creator-login">Login</Link>
        </p>
      </div>
    </Form>
  </>
);

const CreatorSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.setQueryData("creator", data);
      toast.success("Creator account created successfully!");
      navigate("/creator-login");
    },
    onError: (error) => {
      toast.error("Email already in use");
      console.error("Signup failed:", error);
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (mutation.isLoading) return <Spinner />;

  return (
    <>
      <PageNav />

      <div className="bg-dark text-white vh-100 d-flex justify-content-center align-items-center">
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
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "creator",
            confirmPassword: "",
          }}
          validationSchema={CreatorSignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <main className="container my-5">
              <div className="card p-4">
                <CreatorSignupForm isSubmitting={isSubmitting} />
              </div>
            </main>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreatorSignup;
