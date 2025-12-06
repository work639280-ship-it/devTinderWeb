import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <h1 className="flex justify-center text-2xl">Loading...</h1>;
  }

  if (connections.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl py-10">No Connections found</h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <img
              src={photoUrl}
              className="w-20 h-20 rounded-full object-cover"
              alt="photo"
            />

            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">
                {firstName} {lastName}
              </h2>

              {age && gender && <p>{`${age}, ${gender}`}</p>}

              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Connections;
