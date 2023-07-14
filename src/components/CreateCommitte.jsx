import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateCommitte() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return alert("Polje za naziv odbora ne moze biti prazno!");
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_APP_URL}/committes/create-committe`,
        { name },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      alert("Uspjesno ste kreirali odbor!");
      setName("");
      dispatch({ type: "UPDATE_COMMITTES", payload: response.data.committe });
    } catch (error) {
      alert("Greska prilikom kreiranja odbora!");
    }
  };
  return (
    <div className="w-full py-4 px-5 flex flex-col   justify-center rounded-lg shadow-xl border-solid border-gray-100 border-[1px] mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-around h-12 w-full"
      >
        <input
          placeholder="Unesi naziv odbora"
          type="text"
          className="px-2 lg:w-7/12 text-sm bg-white border-b-gray-400 border-b-[1px] outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="w-4/12 lg:w-3/12  hover:bg-[#042861] bg-[#06398b] active:bg-primary-active-color transition duration-500 text-white text-sm lg:text-base lg:font-bold rounded cursor-pointer">
          KREIRAJ
        </button>
      </form>
    </div>
  );
}
