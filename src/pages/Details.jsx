import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";

export const Details = () => {
  const { type, uid } = useParams();
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
    const data = await response.json();

    setDetails(data.result.properties);
  };

  useEffect(() => {
    getDetails();
  }, [type, uid]);

  if (!details) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <img
              src={`https://placehold.co/600x400/000000/FFE81F?text=${details.name}`}
              alt={details.name}
              className="img-fluid"
            />
          </div>

          <div className="col-md-7">
            <h1>{details.name}</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <hr className="text-danger border-2" />

        <div className="row text-danger text-center">
          {Object.entries(details)
            .filter(([key]) => key !== "created" && key !== "edited" && key !== "url")
            .map(([key, value]) => (
              <div className="col" key={key}>
                <h5>{key.replaceAll("_", " ")}</h5>
                <p>{value}</p>
              </div>
            ))}
        </div>

        <Link to="/" className="btn btn-primary mt-4">
          Back home
        </Link>
      </div>
    </>
  );
};