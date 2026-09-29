import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isTokenExpired } from "../utils/token";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  //token
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get("http://localhost:8000/api/user")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching data",
          error.response.status,
          error.message
        );
      });
    // try {
    //   const response = await axios.get("http://localhost:8000/api/user", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       Accept: "application/json",
    //     },
    //   });

    //   console.log(response.data); // Ini hasil dari $request->user()
    // } catch (error) {
    //   console.error(
    //     "Error fetching user:",
    //     error.response?.status,
    //     error.message
    //   );
    // }
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://localhost:8000/api/logout").then(() => {
      localStorage.removeItem("token");

      navigate("/login");
    });
  };
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>

      <h3>Hello, {user.name}</h3>

      <button onClick={logoutHandler} className="bg-red-600">
        logout
      </button>
    </div>
  );
}

export default Dashboard;
