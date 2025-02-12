import React, { useEffect } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";

import { getAssetUrl } from "../APIController";
import { numberWithCommas } from "../utils";

import { abomination } from "../utils";

const Review = ({ review }) => {
  return (
    <>
      <div className="w-96 border border-1 border-gray-200 rounded-md hover:border-purple-600 transition-colors bg-white p-4">
        <div className="flex flex-col gap-2 font-bold">
          {/* <FaUserCircle size={24} /> */}
          {review.user_name}
          <h5 className="font-bold flex items-center mb-2">
            {" "}
            <span className="flex" style={{ color: "orange" }}>
              {[...Array(parseInt(review.rating))].map((_) => (
                <FaStar></FaStar>
              ))}
            </span>
            <span className="flex" style={{ color: "grey" }}>
              {[...Array(5 - parseInt(review.rating))].map((_) => (
                <FaStar></FaStar>
              ))}
            </span>
          </h5>
        </div>
        <div className="p-2">{review.comment}</div>
      </div>
    </>
  );
};

export default Review;
