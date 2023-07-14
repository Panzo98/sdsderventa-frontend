import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useFetchData } from "../hooks/useFetchData";

export default function Filter() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  let committesLoading = useFetchData("COMMITTES");
  const [membersLoading, setMembersLoading] = useState(true);
  const [selectedCommite, setSelectedCommite] = useState(0);
  let committes = useSelector((state) => state.committesReducer);
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchMembers();
  };
  const fetchMembers = async () => {
    try {
      const params = {};
      if (search != "") {
        params.name = search;
      }
      if (selectedCommite != 0) {
        params.committe = selectedCommite;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_APP_URL}/users/get-members${
          search ? `?name=${search}` : ""
        }${
          selectedCommite != 0
            ? `${search ? "&" : "?"}committe=${selectedCommite}`
            : ""
        }`,
        {
          params,
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const clanovi = response.data.members;
      if (!clanovi) {
        return dispatch({ type: "MEMBERS_CLEAR" });
      }
      dispatch({ type: "MEMBERS_FETCH", payload: clanovi });
      setMembersLoading(false);
    } catch (error) {
      setMembersLoading(false);
      dispatch({ type: "MEMBERS_CLEAR" });
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, [selectedCommite]);

  if (membersLoading || committesLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00b2ff]"></div>
      </div>
    );

  return (
    <div className="w-full py-4 px-5 flex flex-col xl:flex-row  justify-between rounded-lg shadow-xl border-solid border-gray-100 border-[1px] mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex mb-4 xl:mb-0 justify-between xl:justify-normal"
      >
        <input
          placeholder="Unesi ime i prezime"
          type="text"
          disabled
          className="px-2 text-sm bg-white border-b-gray-400 border-b-[1px] mr-4 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="rounded border-[1px] px-4 text-xs h-full font-semibold hover:bg-[#042861] bg-[#06398b] text-white">
          PRETRAŽI
        </button>
      </form>
      <div className="flex justify-between xl:justify-normal">
        <span className="mr-4">PRETRAŽI POD :</span>
        <select
          className="px-2 text-sm bg-white border-b-gray-400 border-b-[1px] "
          value={selectedCommite}
          onChange={(e) => setSelectedCommite(e.target.value)}
        >
          <option value={0}>Svi odbori</option>
          {committes.map((elem, index) => {
            return (
              <option value={elem.id} key={index}>
                {elem.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
