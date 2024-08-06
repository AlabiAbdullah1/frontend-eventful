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
      toast.success("Eventee's account created successfully!");
      navigate("/eventee-login");
    },
    onError: (error) => {
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
            role: "user",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <main className="container">
              <div className="card p-4">
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <Field
                      type="text"
                      id="role"
                      name="role"
                      value="Eventee"
                      readOnly
                      className="form-control"
                    />
                    <ErrorMessage
                      name="role"
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
                      id="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
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
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Signup
                    </button>
                  </div>
                </Form>
              </div>
            </main>
          )}
        </Formik>
      </div>
    </>
  );
}
