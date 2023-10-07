import React from "react";

interface CardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  isNotHome?: boolean;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  isNotHome,
}) => {
  const truncatedDescription =
    window.innerWidth <= 768
      ? description?.slice(0, 65) + "..."
      : window.innerWidth > 1024
      ? description?.slice(0, 100) + "..."
      : description?.length >= 120
      ? description?.slice(0, 120)
      : description;

  return (
    <div
      className={`${
        isNotHome ? "w-[350px] h-[450px]" : "w-[200px] h-[350px]"
      } md:w-[300px] md:h-[500px] rounded overflow-hidden shadow-xl  mb-4 `}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageSrc}`}
        alt={title}
        // className="w-full h-52 md:h-80"
        className={isNotHome ? "h-72 md:h-80 w-full" : "w-full h-52 md:h-80"}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-lg md:text-xl mb-2 underline cursor-pointer">
          {title}
        </div>
        <p className="text-gray-700 text-base">{truncatedDescription}</p>
      </div>
    </div>
  );
};

export default Card;
