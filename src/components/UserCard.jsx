// import React from "react";
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

function buildUrl(base, path) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof base === "string" && base.trim() !== "") {
    const trimmed = base.trim().replace(/\/$/, ""); // remove trailing slash
    // If base appears to include protocol -> treat as absolute base
    if (/^https?:\/\//i.test(trimmed)) {
      // safe absolute URL creation
      try {
        return new URL(cleanPath, trimmed).toString();
      } catch (e) {
        console.error("buildUrl: failed to construct absolute URL", e, {
          base: trimmed,
          path: cleanPath,
        });
        // fall through to relative
      }
    } else {
      console.warn(
        "buildUrl: BASE_URL does not include protocol. Falling back to relative path. BASE_URL:",
        trimmed
      );
    }
  } else {
    console.warn(
      "buildUrl: BASE_URL is empty or missing. Using relative path:",
      cleanPath
    );
  }

  // fallback: use relative path (works if your frontend and backend share same origin or proxy is setup)
  return cleanPath;
}

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  // const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    const path = `/request/send/${status}/${userId}`;
    const url = buildUrl(BASE_URL, path);
    try {
      const res = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ",  " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
