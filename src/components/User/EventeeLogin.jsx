import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "../common/Spinner";
import PageNav from "../common/PageNav";
import { eventeeLogin } from "../../api/axios";
import "react-toastify/dist/ReactToastify.css";

// Define the validation schema outside the component to avoid re-creation on each render
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function EventeeLogin() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      return await eventeeLogin(email, password);
    },
    onSuccess: (data, variables) => {
      localStorage.setItem("token", data.token);
      toast.success(`Welcome ${variables.email}`);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("username or password incorrect");
      console.error("Login error", error);
    },
  });

  const handleLogin = async (values) => {
    await mutation.mutateAsync(values);
  };

  if (mutation.isLoading) return <Spinner />;

  return (
    <>
      <PageNav />
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
      <h1>Eventee Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <main className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card bg-light text-dark">
                  <div className="card-body">
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Login
                        </button>
                        <p>
                          Does not have an account?{" "}
                          <Link to="/eventee-signup">signup</Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </Formik>
    </>
  );
}

export default EventeeLogin;
