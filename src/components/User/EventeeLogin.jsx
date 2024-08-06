import styles from "./Login.module.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "../common/Spinner";
import PageNav from "../common/PageNav";
import { eventeeLogin } from "../../api/axios";

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
      // toast.error(error.response?.data?.message || error.message);
      toast.error("username or password incorrect");
      console.error("Login error", error);
    },
  });

  const handleLogin = async (values) => {
    await mutation.mutateAsync(values);
  };

  if (mutation.isPending) return <Spinner />;

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
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <main className={styles.login}>
          <Form className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="email">Email address</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="p" />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="p" />
            </div>
            <div>
              <button className={styles.btnsubmit} type="submit">
                Login
              </button>
            </div>
          </Form>
        </main>
      </Formik>
    </>
  );
}

export default EventeeLogin;
