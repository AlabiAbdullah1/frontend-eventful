import styles from "./Login.module.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageNav from "../common/PageNav";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS
import { login } from "../../api/axios";
import Spinner from "../common/Spinner";

// Define the validation schema outside the component to avoid re-creation on each render
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
      toast.error("username or password incorrect");
      console.error("Login error", error);
    },
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (mutation.isLoading) return <Spinner />;

  return (
    <>
      <PageNav />
      <ToastContainer
        position="bottom-right"
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
          <main className={styles.login}>
            <Form className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <Field type="email" name="email" id="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <button
                  className={styles.btnsubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          </main>
        )}
      </Formik>
    </>
  );
};

export default CreatorLogin;
