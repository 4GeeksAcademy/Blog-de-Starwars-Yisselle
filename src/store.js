export const initialStore = () => ({
  people: [],
  planets: [],
  vehicles: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || []
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return { ...store, people: action.payload };

    case "set_planets":
      return { ...store, planets: action.payload };

    case "set_vehicles":
      return { ...store, vehicles: action.payload };

    case "add_favorite": {
      const exists = store.favorites.some(
        item => item.uid === action.payload.uid && item.type === action.payload.type
      );

      if (exists) return store;

      const newFavorites = [...store.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return { ...store, favorites: newFavorites };
    }

    case "remove_favorite": {
      const newFavorites = store.favorites.filter(
        item => !(item.uid === action.payload.uid && item.type === action.payload.type)
      );

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return { ...store, favorites: newFavorites };
    }

    default:
      return store;
  }
}