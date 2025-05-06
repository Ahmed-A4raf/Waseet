import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex justify-center items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      ))}
      {halfStar && <StarHalf className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

export default RatingStars;
