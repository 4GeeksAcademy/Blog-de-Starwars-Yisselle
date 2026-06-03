import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [open, setOpen] = useState(false);

  const removeFavorite = (favorite) => {
    dispatch({
      type: "remove_favorite",
      payload: favorite
    });
  };

  return (
    <nav className="navbar bg-light mb-5">
      <div className="container position-relative">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/06/Star-Wars-Logo.png"
          alt="Star Wars"
          style={{ width: "80px" }}
        />

        <div className="position-relative">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setOpen(!open)}
          >
            Favorites{" "}
            <span className="badge bg-secondary">
              {store.favorites.length}
            </span>
          </button>

          {open && (
            <div
              className="bg-white border rounded shadow position-absolute end-0 mt-2"
              style={{ minWidth: "220px", zIndex: 1000 }}
            >
              {store.favorites.length === 0 ? (
                <div className="p-2 text-muted">No favorites</div>
              ) : (
                store.favorites.map((favorite) => (
                  <div
                    key={`${favorite.type}-${favorite.uid}`}
                    className="d-flex justify-content-between align-items-center p-2 border-bottom"
                  >
                    <span>{favorite.name}</span>

                    <button
                      className="btn btn-sm btn-link text-dark"
                      onClick={() => removeFavorite(favorite)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};