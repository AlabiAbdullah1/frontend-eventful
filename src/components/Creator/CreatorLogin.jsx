import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageNav from "../common/PageNav";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../api/axios";
import Spinner from "../common/Spinner";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const CreatorLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      return await login(email, password);
    },
    onSuccess: (data, variables) => {
      localStorage.setItem("token", data.token);
      toast.success(`Welcome ${variables.email}`);
      navigate("/creator-dashboard");
    },
    onError: (error) => {
      toast.error("Username or password incorrect");
      console.error("Login error", error);
    },
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await mutation.mutateAsync(values);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageNav />
      <h2>Creator Login</h2>
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
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <main className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
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
                          {isSubmitting ? <Spinner /> : "Login"}
                        </button>
                        <p>
                          Don’t have an account?{" "}
                          <Link to="/creator-signup">Sign up</Link>
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
};

export default CreatorLogin;
