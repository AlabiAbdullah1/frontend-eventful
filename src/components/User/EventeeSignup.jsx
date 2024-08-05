import styles from "./Login.module.css";
import PageNav from "../common/PageNav";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../common/Spinner";
import { eventeesignup } from "../../api/axios";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS

// Define the validation schema outside the component to avoid re-creation on each render
const signupSchema = Yup.object().shape({
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
  role: Yup.string().default("user"),
});

export default function EventeeSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (requestBody) => {
      return await eventeesignup(requestBody);
    },
    onSuccess: (requestData) => {
      queryClient.setQueryData("creator", requestData);
      toast.success("Account created successfully");
      navigate("/eventee-login");
    },
    onError: (error) => {
      // toast.error(error.message || "Signup failed");
      console.error("Signup failed:", error.message);
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { name, email, password, role } = values;
      await mutation.mutateAsync({ name, email, password, role });
    } catch (error) {
      toast.error("email already in use");
    } finally {
      setSubmitting(false);
    }
  };

  if (mutation.isLoading) return <Spinner />;
  // if (mutation.isError) return <div>Error during signup...</div>;

  return (
    <div>
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
          role: "user",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <main className={styles.login}>
            <PageNav />
            <Form className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={styles.error}
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={styles.error}
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="role">Role</label>
                <Field
                  type="text"
                  id="role"
                  name="role"
                  value="Eventee"
                  readOnly
                />
                <ErrorMessage
                  name="role"
                  component="p"
                  className={styles.error}
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="p"
                  className={styles.error}
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className={styles.error}
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <div>
                <button
                  className={styles.btnsubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Signup
                </button>
              </div>
            </Form>
          </main>
        )}
      </Formik>
    </div>
  );
}
