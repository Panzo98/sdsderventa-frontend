import React from "react";
import { useSelector } from "react-redux";
import NewPosition from "./NewPosition";
import PositionTableRow from "./PositionTableRow";
import { useFetchData } from "../hooks/useFetchData";
export default function Position() {
  const positionsLoading = useFetchData("POSITIONS");
  const data = useSelector((state) => state.positionsReducer);

  if (positionsLoading)
    return (
      <div className="flex items-center justify-center h-full w-full mt-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00b2ff]"></div>
      </div>
    );
  return (
    <div className=" w-full flex flex-col px-4  xl:px-96 ">
      <NewPosition />
      <div className="w-full bg-white py-4 px-5 flex flex-col justify-between rounded-lg shadow-xl border-solid border-gray-100 border-[1px]">
        {data[0] && (
          <div className="flex w-full mb-2 text-[6px] xl:text-[10px]">
            <span className="w-[5%] font-semibold flex items-center justify-center">
              ID
            </span>
            <span className="w-[85%] flex items-center justify-center font-semibold">
              NAZIV POZICIJE
            </span>
            <button className="w-[10%] flex items-center justify-center font-semibold">
              UKLONI
            </button>
          </div>
        )}
        {data[0] ? (
          data.map((elem, index) => (
            <PositionTableRow data={elem} key={index} newId={index} />
          ))
        ) : (
          //TODO OVO ISPOD SE PRIKAZUJE ISPOD LOADERA
          <span className="flex w-full justify-center items-center text-gray-500 font-semibold xl:font-medium">
            -- NEMA ZAPISA --
          </span>
        )}
      </div>
    </div>
  );
}
