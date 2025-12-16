import React from 'react';
import SectionTitle from "../../Utilities/SectionTitle";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ reviews }) => {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-5">
      <SectionTitle
        sectionName={"Reviews"}
        customStyle={"max-w-4xl mx-auto mb-4! text-left"}
      />

      {(!reviews || reviews.length === 0) ? (
        <p className="text-center mt-10 text-gray-500">No reviews found</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 sm:flex-row sm:items-start"
          >
            {/* Left Border */}
            <div className="absolute left-0 top-0 h-full w-2 bg-linear-to-b from-primary to-accent-content rounded-l-xl"></div>

            {/* User Image */}
            <img
              src={review.userImage}
              alt={review.userName}
              className="w-14 h-14 rounded-full object-cover border"
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{review.userName}</h3>
                  <p className="text-sm text-secondary">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < review.ratingPoint ? "text-accent" : "text-secondary"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium text-secondary">
                    {review.ratingPoint}.0
                  </span>
                </div>
              </div>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {review.reviewComment}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewCard;
