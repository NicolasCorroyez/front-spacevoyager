import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlanet from "./CardPlanet/CardPlanet";

import { useBooking } from "../../contexts/BoonkingContext";

export default function SearchPlanet({
  departureDate,
  comebackDate,
  person,
  setPlanet,
  planet,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [cardSelected, setCardSelected] = useState([]);

  const { state, dispatch } = useBooking();

  const fetchSearchPlanet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}`
      );
      console.log("response.data", response.data);
      setData(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setError(error);
    }
  };

  const navigate = useNavigate();
  const handleClick = (start, end, passengers, planet) => {
    setPlanet(planet.name);

    // Utilisez dispatch pour enregistrer l'objet planet choisie
    dispatch({ type: "SET_PLANET", payload: planet });

    navigate(
      `/search?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet.name}`
    );
  };

  useEffect(() => {
    console.log("this is fetchSearchPlanet");
    fetchSearchPlanet();
  }, []);

  useEffect(() => {
    console.log("cardSelected", cardSelected);
  }, [cardSelected]);

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {}
          </ul>
        </div>
      </div>
      <div className="sm:flex sm:flex-col sm:justify-between h-full lg:grid lg:grid-cols-3 lg:mx-10 lg:grid-rows-3 lg:gap-4">
        <div className="flex gap-3 flex-col lg:col-start-3 lg:row-start-1">
          <div className="flex gap-3 mx-4">
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="font-bold inline">Aller : </h2>
              <p className="text-center inline">{departureDate}</p>
            </div>
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="font-bold inline ">Retour : </h2>
              <p className="text-center inline">{comebackDate}</p>
            </div>
          </div>

          <div className=" flex gap-3 bg-indigo-50/10 mx-4 p-2 backdrop-blur-sm text-white rounded-lg text-center">
            <h2 className="font-bold">Nombre de passager :</h2>
            <p className="">{person}</p>
          </div>

          <div className=" flex mb-4 justify-center">
            <ul className="steps">
              <li className="step step-primary">Choix planet</li>
              <li className="step">Choix hotel</li>
              <li className="step">Confirmation</li>
            </ul>
          </div>
        </div>
        <div className="overflow-y-auto no-scrollbar h-96 lg:h-[45rem] lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1">
          {error ? (
            <p>Une erreur s'est produite : {error.message}</p>
          ) : data ? (
            data.map((planetData) => (
              <CardPlanet
                key={planetData.id}
                planetData={planetData}
                setCardSelected={setCardSelected}
              />
            ))
          ) : (
            <p>Chargement en cours...</p>
          )}
        </div>

        <div className="flex flex-col justify-between mx-4 gap-3 lg:row-span-3 lg:col-start-3 lg:row-start-2">
          <div className="rounded-lg bg-indigo-50/10 backdrop-blur-sm">
            <div className="flex gap-3">
              <div className="w-1/2 p-2 text-white rounded-lg">
                <h2 className="font-bold">Planet selectionnée :</h2>
                {cardSelected.name ? <p>{cardSelected.name}</p> : <p>_</p>}
              </div>

              <div className="w-1/2 p-2 text-white rounded-lg">
                <p className="font-bold">
                  Prix :{" "}
                  {cardSelected.name ? (
                    <span>
                      {cardSelected.price}€ x {person}
                    </span>
                  ) : (
                    <span>_</span>
                  )}
                </p>
                <p className="font-bold">
                  Prix total : {cardSelected.price * person}€
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn-primary rounded-none rounded-b-lg w-full"
                onClick={() =>
                  handleClick(departureDate, comebackDate, person, cardSelected)
                }
              >
                VALIDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
