/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../assets/images/default.jpeg";
interface CardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  isNotHome?: boolean;
  id: number;
  type: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,

  id,
  type,
}) => {
  const navigate = useNavigate();
  const truncatedDescription =
    description && window.innerWidth <= 768
      ? description?.slice(0, 65) + "..."
      : window.innerWidth <= 1024
      ? description?.slice(0, 100) + "..."
      : description;
  const truncatedTitle =
    title && title.length >= 25 ? title.slice(0, 22) + "..." : title;
  return (
    <div
      className={
        " w-[350px] h-[450px] md:w-[300px] md:h-[500px] rounded overflow-hidden shadow-xl  mb-4 "
      }
    >
      <img
        src={imageSrc ? `https://image.tmdb.org/t/p/w500/${imageSrc}` : Avatar}
        alt={title}
        className={"h-80 w-full bg-slate-400"}
      />
      <div className="px-6 py-4">
        <p
          onClick={() => {
            navigate(`/detail/${type}/${id}`);
            console.log(type, id);
          }}
          className="font-bold text-lg md:text-xl mb-2 underline cursor-pointer"
        >
          {truncatedTitle || "lorem ipsum dolor sir amet"}
        </p>
        <p className="text-gray-700 text-base">
          {truncatedDescription
            ? truncatedDescription.length >= 120
              ? truncatedDescription.slice(0, 120) + "..."
              : truncatedDescription
            : "lorem ipsum"}
        </p>
      </div>
    </div>
  );
};

export default Card;
