import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
export default function PositionTableRow({ data, newId }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_APP_URL}/positions/delete-position/${data.id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      dispatch({ type: "DELETE_POSITION", payload: data.id });
      alert(`Позиција ${data.title} успjешно избрисана!`);
    } catch (error) {
      alert("Дошло је до грешке приликом брисања позиције!");
    }
  };
  return (
    <div className=" border-b-[1px] flex w-full text-[6px] xl:text-sm">
      <span className=" items-center flex w-[5%] border-l-[1px] justify-center border-r-[1px] border-t-[1px] py-1 xl:py-3">
        {newId + 1}
      </span>
      <span className=" items-center flex w-[85%] pl-2 border-r-[1px] border-t-[1px] py-1 xl:py-3">
        {data.title}
      </span>
      <div className="w-[10%] flex justify-center items-center border-r-[1px] border-t-[1px] py-1 xl:py-3">
        <svg
          fill="#FA5252"
          viewBox="0 0 26 26"
          width="12px"
          height="12px"
          className="scale-[0.6] xl:scale-[1] cursor-pointer xl:hover:scale-[1.3] transition-none xl:transition"
          onClick={handleDelete}
        >
          <path
            fill="none"
            stroke="#FA5252"
            strokeWidth="2.0803"
            strokeMiterlimit="10"
            d="M9,4.429V3c0-1.421,0.619-2,2-2h4  c1.381,0,2,0.579,2,2v1.429"
          />
          <path
            fill="#FA5252"
            d="M23,4L23,4c0-0.551-0.449-1-1-1H4C3.449,3,3,3.449,3,4l0,0H2v2h22V4H23z"
          />
          <path
            fill="#FA5252"
            d="M4,7v16c0,1.654,1.346,3,3,3h12c1.654,0,3-1.346,3-3V7H4z M10,22H8V10h2V22z M14,22h-2V10h2V22z M18,22h-2  V10h2V22z"
          />
        </svg>
      </div>
    </div>
  );
}
