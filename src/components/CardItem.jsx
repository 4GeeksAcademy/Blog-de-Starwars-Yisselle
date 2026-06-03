import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CardItem = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const imageText = item.name.replaceAll(" ", "+");

  const addFavorite = () => {
    dispatch({
      type: "add_favorite",
      payload: {
        name: item.name,
        uid: item.uid,
        type
      }
    });
  };

  const isFavorite = store.favorites.some(
    fav => fav.uid === item.uid && fav.type === type
  );

  return (
    <div className="card flex-shrink-0" style={{ width: "18rem" }}>
      <img
        src={`https://placehold.co/400x200?text=${imageText}`}
        className="card-img-top"
        alt={item.name}
      />

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>

        {type === "people" && (
          <>
            <p className="mb-1">Gender: {item.gender}</p>
            <p className="mb-1">Hair Color: {item.hair_color}</p>
            <p className="mb-3">Eye Color: {item.eye_color}</p>
          </>
        )}

        {type === "planets" && (
          <>
            <p className="mb-1">Population: {item.population}</p>
            <p className="mb-1">Terrain: {item.terrain}</p>
            <p className="mb-3">Climate: {item.climate}</p>
          </>
        )}

        {type === "vehicles" && (
          <>
            <p className="mb-1">Model: {item.model}</p>
            <p className="mb-1">Class: {item.vehicle_class}</p>
            <p className="mb-3">Passengers: {item.passengers}</p>
          </>
        )}

        <div className="d-flex justify-content-between">
          <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>

          <button
            className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
            onClick={addFavorite}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};