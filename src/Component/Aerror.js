import "../ComponentStyle/Aerror.css";
import Aheader from "./Aheader";
import Afooter from "./Afooter";

export default function ErrorPage() {
  return (
    <>
      <Aheader />
      <div id="error-page">
        <h1 className="error-msg">404 Not Found</h1>
        <h2>Oops Page not found</h2>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <Afooter />
    </>
  );
}
