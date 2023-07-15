import React from "react";
import CreateCommitte from "./CreateCommitte";
import { useSelector } from "react-redux";
import CommitteTableRow from "./CommitteTableRow";
import { useFetchData } from "../hooks/useFetchData";

export default function Committe() {
  const committesLoading = useFetchData("COMMITTES");
  const data = useSelector((state) => state.committesReducer);

  if (committesLoading)
    return (
      <div className="flex items-center justify-center h-full w-full mt-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00b2ff]"></div>
      </div>
    );
  return (
    <div className=" w-full flex flex-col px-4  xl:px-96 ">
      <CreateCommitte />
      <div className="w-full bg-white py-4 px-5 flex flex-col justify-between rounded-lg shadow-xl border-solid border-gray-100 border-[1px]">
        {data[0] && (
          <div className="flex w-full mb-2 text-[6px] xl:text-[10px]">
            <span className="w-[5%] font-semibold flex items-center justify-center">
              ИД
            </span>
            <span className="w-[85%] flex items-center justify-center font-semibold">
              НАЗИВ
            </span>
            <span className="w-[10%] flex items-center justify-center font-semibold">
              УКЛОНИ
            </span>
          </div>
        )}
        {data[0] ? (
          data.map((elem, index) => (
            <CommitteTableRow data={elem} key={index} newId={index} />
          ))
        ) : (
          //TODO OVO ISPOD SE PRIKAZUJE ISPOD LOADERA
          <span className="flex w-full justify-center items-center text-gray-500 font-semibold xl:font-medium">
            -- НЕМА ЗАПИСА --
          </span>
        )}
      </div>
    </div>
  );
}
