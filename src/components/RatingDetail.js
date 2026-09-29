import axios from "axios";
import { useEffect, useState } from "react";

function RatingDetail({ id }) {
  const [rating_detail, setRatingDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatingDetail = async () => {
    await axios
      .get(`http://localhost:8000/api/product/${id}/rating_detail`)
      .then((response) => {
        // console.log(response.data.data);
        setRatingDetail(response.data.data);
      })
      .catch((error) => {
        console.log(
          "Error Fetching Data",
          error.response.status,
          error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRatingDetail();
  }, [id]);
  // console.log(rating_detail);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="mb-3 flex flex-row gap-5 rounded-xl border border-black p-3 ">
      <div className="w-[30%]">
        <h1 className="text-5xl text-black ">
          <span className="text-yellow-500">★</span>
          <span className="font-bold">{rating_detail.avg}</span>
          <span className="text-2xl text-gray-500">/5.0</span>
        </h1>
        <h1 className="text-2xl text-black">
          {rating_detail.percentage_satisfaction} % satisfaction
        </h1>
        <p className="text-2xl  text-gray-500">{rating_detail.total} Rating</p>
      </div>
      <div className="w-[70%]">
        {Array.isArray(rating_detail.ratings) &&
          rating_detail.ratings.map((rating, i) => {
            return (
              <div key={i}>
                <div className="flex flex-row items-center  mb-2">
                  <span className="mr-2">{rating.rating} ★</span>
                  <div
                    className="flex-grow bg-gray-200"
                    style={{
                      height: "0.5rem",
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="bg-black"
                      style={{
                        width: `${rating.percentage}%`,
                        height: "100%",
                      }}
                    ></div>
                  </div>
                  <span className="ml-2">({rating.count})</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RatingDetail;
