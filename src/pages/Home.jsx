import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CardItem } from "../components/CardItem.jsx";
import { Navbar } from "../components/Navbar.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getItemsWithDetails = async (type) => {
    const response = await fetch(`https://www.swapi.tech/api/${type}`);
    const data = await response.json();

    const details = await Promise.all(
      data.results.map(async (item) => {
        const res = await fetch(item.url);
        const info = await res.json();

        return {
          ...item,
          ...info.result.properties
        };
      })
    );

    return details;
  };

  const getData = async () => {
    const people = await getItemsWithDetails("people");
    const planets = await getItemsWithDetails("planets");
    const vehicles = await getItemsWithDetails("vehicles");

    dispatch({ type: "set_people", payload: people });
    dispatch({ type: "set_planets", payload: planets });
    dispatch({ type: "set_vehicles", payload: vehicles });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="text-danger mb-4">Characters</h2>
        <div className="d-flex overflow-auto gap-4 mb-5 pb-3">
          {store.people.map(item => (
            <CardItem key={item.uid} item={item} type="people" />
          ))}
        </div>

        <h2 className="text-danger mb-4">Planets</h2>
        <div className="d-flex overflow-auto gap-4 mb-5 pb-3">
          {store.planets.map(item => (
            <CardItem key={item.uid} item={item} type="planets" />
          ))}
        </div>

        <h2 className="text-danger mb-4">Vehicles</h2>
        <div className="d-flex overflow-auto gap-4 mb-5 pb-3">
          {store.vehicles.map(item => (
            <CardItem key={item.uid} item={item} type="vehicles" />
          ))}
        </div>
      </div>
    </>
  );
};