import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import Footer from "./Footer";

export default function Homepage() {
  return (
    <>
      <main className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="position-absolute top-0 w-100">
          <PageNav />
        </div>
        <section className="text-center p-5">
          <h1 className="display-1">
            WELCOME TO EVENTFUL
            <br />
            Your gateway to Exciting Events
          </h1>
          <h2 className="lead my-4">
            Are you tired of missing out on the hottest events in town? Look no
            further! Eventful is your one-stop destination for discovering and
            purchasing tickets to the most thrilling events around. Whether
            you’re into concerts, sports, theater, or festivals, we’ve got you
            covered with a seamless and user-friendly platform designed to cater
            to all your event needs.
          </h2>

          <Link
            to="/eventee-login"
            className="btn btn-primary btn-lg text-decoration-none"
          >
            Buy Your Tickets now!
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
