import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Star = ({ filled, onClick }) => {
  return (
    <span onClick={onClick} className={`cursor-pointer text-gold`}>
      {filled ? <FaStar /> : <FaRegStar />}
    </span>
  );
};

export default Star;
