import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { FaStar } from "react-icons/fa";

import { getAssetUrl } from "../APIController";
import { numberWithCommas } from "../utils";

import { abomination } from "../utils";

// LMAO JS TYPE CONVERSIONS ARE A JOKE
// loosing patience if you couldn't guess
// HAHAHAH FUCK AAAAAAAAAAAAAAAHHHAHAHAHA
// years_left = 54 // Optimistic guesstimation
// TODO: Maybe better to use a useState thing, but it works currently so best not to touch it even with a feather cuz **I HATE JS AND FRONTEND**
const Pagination = ({ pageCount, currentPage }) => {
  return (
    <div className="flex items-center gap-4">
      {currentPage != 1 && (
        <>
          <a href={"?page=1"}>{"<<"}</a>
          <a href={"?page=" + (currentPage - 1)}>{"<"}</a>
        </>
      )}
      {[...Array(pageCount).keys()].map((a, i) => (
        <a
          href={"?page=" + (a + 1)}
          className={
            (a + 1 == currentPage) | (!currentPage && a == 0) ? "font-bold" : ""
          }
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {a + 1}
        </a>
      ))}
      {currentPage != pageCount && (
        <>
          <a href={"?page=" + (currentPage + 1)}>{">"}</a>
          <a href={"?page=" + pageCount}>{">>"}</a>
        </>
      )}
    </div>
  );
};

export default Pagination;
