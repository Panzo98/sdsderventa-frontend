import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useFetchData = (type) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let apiUrl = "";
  let reduxType = "";

  if (type === "COMMITTES") {
    apiUrl = "/committes/get-all-committes";
    reduxType = "COMMITTES_FETCH";
  }
  if (type === "POSITIONS") {
    apiUrl = "/positions/get-all-positions";
    reduxType = "POSITIONS_FETCH";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_APP_URL}${apiUrl}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        dispatch({ type: reduxType, payload: response.data });
        setLoading(false);
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, reduxType, dispatch]);

  return loading;
};
