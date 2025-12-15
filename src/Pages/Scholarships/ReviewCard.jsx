import { FaStar } from "react-icons/fa";
import SectionTitle from "../../Utilities/SectionTitle";

const ReviewCard = () => {
  const reviews = [
    {
      _id: "1",
      userImage: "https://i.pravatar.cc/150?img=12",
      userName: "Sarah Ahmed",
      rating: 5,
      comment:
        "This scholarship covered all my expenses and the application process was very smooth. Highly recommended!",
      date: "2025-01-18",
    },
    {
      _id: "2",
      userImage: "https://i.pravatar.cc/150?img=32",
      userName: "John Miller",
      rating: 4,
      comment:
        "Great opportunity for international students. The stipend was sufficient for living in Tokyo.",
      date: "2025-02-02",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-5">

      <SectionTitle sectionName={"Reviews"} customStyle={"max-w-4xl mx-auto mb-4! text-left"} />
      {reviews.map((review) => (
        <div
          key={review._id}
          className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 sm:flex-row sm:items-start"
        >
          {/* Designed Border */}
          <div className="absolute left-0 top-0 h-full w-2 bg-linear-to-b from-primary to-accent-content rounded-l-xl"></div>

          {/* User Image */}
          <img
            src={review.userImage}
            alt={review.userName}
            className="w-14 h-14 rounded-full object-cover border"
          />

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{review.userName}</h3>
                <p className="text-sm text-secondary">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${i < review.rating ? "text-accent" : "text-secondary"
                      }`}
                  />
                ))}
                <span className="ml-1 text-sm font-medium text-secondary">
                  {review.rating}.0
                </span>
              </div>
            </div>

            {/* Comment */}
            <p className="mt-3 text-gray-600 leading-relaxed">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
