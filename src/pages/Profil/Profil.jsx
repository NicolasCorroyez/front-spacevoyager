import React, { useState } from "react";
import { useContext, useEffect } from "react";
import request from "../../tools/request";
// LIBS
/* import { useNavigate } from "react-router-dom"; */
import Title from "../../components/Title/Title";

// CONTEXTS
import { AuthContext } from "../../contexts/AuthContext";

// HOOKS
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

// COMPONENTS
import ProtectedZone from "../../components/Protected/Protected";
import ReservationCard from "../../components/ReservationCard/ReservationCard";

export default function Profil() {
  const isAuthenticated = useIsAuthenticated();
  const [isEditing, setIsEditing] = useState(false);
  const [editLastname, setEditLastname] = useState("");
  const [editFirstname, setEditFirstname] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [dataUser, setDataUser] = useState({});

  const auth = useContext(AuthContext);

  const getUserProfil = async () => {
    try {
      console.log("isAuthenticated", isAuthenticated);
      const id = auth.state.data.user.id;
      const token = auth.getAccessToken();

      const response = await request.protected(token).get(`/user/${id}`);
      console.log("this is reponse.data[0]", response.data[0]);
      setDataUser(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    const user = {
      id: dataUser.id,
      firstname: editFirstname ? editFirstname : dataUser.firstname,
      lastname: editLastname ? editLastname : dataUser.lastname,
      mail: editEmail ? editEmail : dataUser.mail,
    };

    const id = auth.state.data.user.id;
    const token = auth.getAccessToken();
    try {
      const response = await request
        .protected(token)
        .patch(`/user/${id}`, user);
      setIsEditing(false);
      //setData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const id = auth.state.data.user.id;
    const token = auth.getAccessToken();
    try {
      const response = await request.protected(token).delete(`/user/${id}`);
      /* console.log(response); */
      await auth.logout();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getUserProfil();
  }, [isAuthenticated]);

  return (
    <ProtectedZone to={"/login"}>
      <div className="flex flex-col items-center text-black lg:flex-row-reverse">
        <div className="card card-compact w-21 text-white p-5 lg:w-8/12 self-start">
          <figure className="self-center rounded-full w-4/12 lg:w-3/12 mb-4">
            <img
              src="../../../public/photo-1534528741775-53994a69daeb.jpg"
              alt="planet_image"
              className=""
            />
          </figure>
          <div className="flex flex-col gap-2 text-black">
            <div className="lg:flex justify-center gap-20">
              <label className="w-10 font-bold text-white">FIRSTNAME</label>
              {isEditing ? (
                <input
                  className="input input-bordered w-full max-w-xs self-center"
                  name=""
                  defaultValue={dataUser?.firstname}
                  autoFocus
                  onChange={(event) => setEditFirstname(event.target.value)}
                />
              ) : (
                <p className="input input-bordered w-full max-w-xs self-center">
                  {editFirstname ? editFirstname : dataUser?.firstname}
                </p>
              )}
            </div>
            <div className="lg:flex justify-center gap-20">
              <label className="w-10 font-bold text-white">LASTNAME</label>
              {isEditing ? (
                <input
                  className="input input-bordered input-primary w-full max-w-xs self-center"
                  name=""
                  defaultValue={dataUser?.lastname}
                  autoFocus
                  onChange={(event) => setEditLastname(event.target.value)}
                />
              ) : (
                <p className="input input-bordered input-primary w-full max-w-xs self-center">
                  {editLastname ? editLastname : dataUser?.lastname}
                </p>
              )}
            </div>
            <div className="lg:flex justify-center gap-20">
              <h4 className="w-10 font-bold text-white">Email</h4>
              {isEditing ? (
                <input
                  className="input input-bordered input-primary w-full max-w-xs self-center"
                  name=""
                  defaultValue={dataUser?.mail}
                  autoFocus
                  onChange={(event) => setEditEmail(event.target.value)}
                />
              ) : (
                <p className="input input-bordered input-primary w-full max-w-xs self-center">
                  {editEmail ? editEmail : dataUser?.mail}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-center shadow-sm">
            {isEditing ? (
              <button
                className="mt-4 text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                onClick={() => handleEdit()}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                Valider
              </button>
            ) : (
              <button
                className="mt-4 text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                onClick={() => setIsEditing(true)}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                Editer
              </button>
            )}

            <button
              className="mt-4 text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              onClick={() => window.my_modal_5.showModal()}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
              Supprimer
            </button>
          </div>

          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Etes vous sûr de vouloir supprimer votre profil ? Toutes vos
                réservations le seront également
              </p>
              <div className="modal-action">
                <button className="btn">Close</button>
                <button className="btn" onClick={() => handleDelete()}>
                  Supprimer
                </button>
              </div>
            </form>
          </dialog>
        </div>

        <div className="divider lg:divider-horizontal before:bg-primary after:bg-secondary max-w-100"></div>

        <div className="flex flex-col items-center">
          {dataUser.reservation &&
          //! This is bricolage, better not to send null
          dataUser.reservation[0].planet_name !== null &&
          dataUser.reservation.length > 0 ? (
            dataUser.reservation.map((element, index) => (
              <ReservationCard key={index} reservation={element} />
            ))
          ) : (
            <p>No reservations available</p>
          )}
        </div>
      </div>
    </ProtectedZone>
  );
}
