import styles from "./Login.module.css";
import PageNav from "../common/PageNav";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS

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
  <Form className={styles.form}>
    <div className={styles.row}>
      <label htmlFor="name">Name</label>
      <Field type="text" id="name" name="name" />
      <ErrorMessage name="name" component="div" className={styles.error} />
    </div>
    <div className={styles.row}>
      <label htmlFor="email">Email address</label>
      <Field type="email" id="email" name="email" />
      <ErrorMessage name="email" component="div" className={styles.error} />
    </div>
    <div className={styles.row}>
      <label htmlFor="role">Role</label>
      <Field type="text" id="role" name="role" value="creator" readOnly />
      <ErrorMessage name="role" component="div" className={styles.error} />
    </div>
    <div className={styles.row}>
      <label htmlFor="password">Password</label>
      <Field type="password" id="password" name="password" />
      <ErrorMessage name="password" component="div" className={styles.error} />
    </div>
    <div className={styles.row}>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <Field type="password" id="confirmPassword" name="confirmPassword" />
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
);

const CreatorSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.setQueryData("creator", data);
      toast.success("Creator Account Created");
      navigate("/creator-login");
    },
    onError: (error) => {
      // toast.error(error.response?.data?.message || error.message);
      console.error("Signup failed:", error);
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      toast.error("email already in use");
    } finally {
      setSubmitting(false);
    }
  };

  if (mutation.isLoading) return <Spinner />;

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
          role: "creator",
          confirmPassword: "",
        }}
        validationSchema={CreatorSignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <main className={styles.login}>
            <PageNav />
            <CreatorSignupForm isSubmitting={isSubmitting} />
          </main>
        )}
      </Formik>
    </div>
  );
};

export default CreatorSignup;
