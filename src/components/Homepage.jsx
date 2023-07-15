import React, { useState } from "react";
import TableRow from "./TableRow";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import NewMembers from "./NewMembers";

export default function Homepage() {
  const data = useSelector((state) => state.membersReducer);
  const [enableAddNewMember, setEnableAddNewMember] = useState(false);
  return (
    <div className=" w-full flex flex-col px-4  xl:px-96 ">
      <div className="w-full h-12 flex text-sm  justify-between text-white shadow-xl border-solid border-gray-100 border-[1px] mb-4">
        <span
          className="w-6/12 flex items-center justify-center cursor-pointer transition"
          onClick={() => setEnableAddNewMember(false)}
          style={{
            backgroundColor: !enableAddNewMember
              ? "#06398b"
              : "rgba(107,114,128,0.6)",
          }}
        >
          ПРИКАЗ ЧЛАНОВА
        </span>
        <span
          className="w-6/12 flex items-center justify-center cursor-pointer transition"
          onClick={() => setEnableAddNewMember(true)}
          style={{
            backgroundColor: enableAddNewMember
              ? "#06398b"
              : "rgba(107,114,128,0.6)",
          }}
        >
          ДОДАЈ ЧЛАНА
        </span>
      </div>

      {enableAddNewMember ? (
        <NewMembers setEnableAddNewMember={setEnableAddNewMember} />
      ) : (
        <>
          <Filter />
          <div className="w-full bg-white py-4 px-5 flex flex-col justify-between rounded-lg shadow-xl border-solid border-gray-100 border-[1px]">
            {data[0] && (
              <div className="flex w-full mb-2 text-[6px] xl:text-[10px]">
                <span className="w-[5%] font-semibold flex items-center justify-center">
                  ИД
                </span>
                <span className="w-[20%] flex items-center justify-center font-semibold">
                  ИМЕ
                </span>
                <span className="w-[20%] flex items-center justify-center font-semibold">
                  ПРЕЗИМЕ
                </span>
                <span className="w-[15%] flex items-center justify-center font-semibold">
                  ОДБОР
                </span>
                <span className="w-[15%] flex items-center justify-center font-semibold">
                  ПОЗИЦИЈА
                </span>
                <span className="w-[15%] flex items-center justify-center font-semibold">
                  БР. ТЕЛЕФОНА
                </span>
                <button className="w-[10%] flex items-center justify-center font-semibold">
                  УКП: {data.length}
                </button>
              </div>
            )}
            {data[0] ? (
              data.map((elem, index) => (
                <TableRow data={elem} key={index} newId={index} />
              ))
            ) : (
              //TODO OVO ISPOD SE PRIKAZUJE ISPOD LOADERA
              <span className="flex w-full justify-center items-center text-gray-500 font-semibold xl:font-medium">
                -- НЕМА ЗАПИСА --
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
