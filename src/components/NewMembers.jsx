import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchData } from "../hooks/useFetchData";
import { useSelector } from "react-redux";

export default function NewMembers({ setEnableAddNewMember }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCommite, setSelectedCommite] = useState();
  const [selectedPosition, setSelectedPosition] = useState();
  const committesLoading = useFetchData("COMMITTES");
  const committes = useSelector((state) => state.committesReducer);
  const positionsLoading = useFetchData("POSITIONS");
  const positions = useSelector((state) => state.positionsReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_APP_URL}/users/create-member`,
        {
          firstName,
          lastName,
          odborId: selectedCommite,
          phoneNumber,
          positionId: selectedPosition,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      alert(response.data.message);
      setEnableAddNewMember(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {}, []);

  if (positionsLoading || committesLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00b2ff]"></div>
      </div>
    );

  return (
    <div className="w-full py-4 px-5 flex flex-col   justify-center rounded-lg shadow-xl border-solid border-gray-100 border-[1px] mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex mb-4 xl:mb-0  justify-center flex-col  w-full"
      >
        <div className="flex flex-col w-full justify-center items-center">
          <input
            placeholder="Unesi ime"
            type="text"
            className="px-2 w-8/12 mb-4 text-sm bg-white border-b-gray-400 border-b-[1px] outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Unesi prezime"
            type="text"
            className="px-2 w-8/12 mb-4 text-sm bg-white border-b-gray-400 border-b-[1px] outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Unesi broj telefona"
            type="text"
            className="px-2 w-8/12 mb-4 text-sm bg-white border-b-gray-400 border-b-[1px] outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <select
            className="px-2 w-8/12 mb-4 text-sm bg-white border-b-gray-400 border-b-[1px] "
            value={selectedCommite}
            onChange={(e) => setSelectedCommite(e.target.value)}
          >
            <option default selected disabled>
              -- Izaberi odbor --
            </option>
            {committes.map((elem, index) => {
              return (
                <option value={elem.id} key={index}>
                  {elem.name}
                </option>
              );
            })}
          </select>
          <select
            className="px-2 w-8/12 mb-4 text-sm bg-white border-b-gray-400 border-b-[1px] "
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option default selected disabled>
              -- Izaberi poziciju --
            </option>
            {positions.map((elem, index) => {
              return (
                <option value={elem.id} key={index}>
                  {elem.title}
                </option>
              );
            })}
          </select>
          <button className="mt-5 w-8/12  hover:bg-[#042861] bg-[#06398b] active:bg-primary-active-color transition duration-500 text-white py-2 text-lg font-bold rounded cursor-pointer">
            KREIRAJ
          </button>
        </div>
      </form>
    </div>
  );
}
