import { FaStar } from "react-icons/fa";

const Rating = ({ rating = 5 }: { rating: number }) => {
  const ratingWithCeil = Math.ceil(rating);
  return (
    <div className="flex ">
      {Array(ratingWithCeil)
        .fill(1)
        .map((_, i) => (
          <FaStar key={i} className="h-5 text-yellow-500 " />
        ))}
    </div>
  );
};

export default Rating;
