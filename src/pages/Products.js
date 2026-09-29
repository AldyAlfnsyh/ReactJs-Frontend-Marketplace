import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

function Products() {
  const [modelData, setModelData] = useState([]);
  const [modelPagination, setModelPagination] = useState([]);

  const fetchData = async (url = "http://localhost:8000/api/product") => {
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        setModelData(response.data.data.data);
        setModelPagination({
          prev: response.data.data.prev_page_url,
          next: response.data.data.next_page_url,
        });
      })
      .catch((error) => {
        console.log(
          "Error fetching data",
          error.response.status,
          error.message
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <div className="flex flex-wrap justify-center gap-5">
          {modelData.map((product, i) => {
            return (
              <Link key={i} to={`/product/${product.id}`}>
                <div
                  className="h-auto bg-slate-100 rounded-md shadow-md"
                  style={{ width: "15rem" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "15rem",
                      // objectFit: "cover", // atau 'contain' jika ingin seluruh gambar terlihat tanpa dipotong
                    }}
                    // className="relative"
                  >
                    {/* <img
                      className="w-7 h-7 m-2 top-0 right-0 absolute"
                      src="/heart_black.png"
                    /> */}
                    <img
                      src={`http://localhost:8000/storage/uploads/products/
${product.image[0]?.image}`}
                      className="  w-full h-full"
                      alt="Product Image"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="p-2">
                    <div style={{ height: "2.8rem" }}>
                      <h5
                        className=""
                        style={{
                          fontSize: "1rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // ganti jadi 2 kalau mau 2 baris
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.name}
                      </h5>
                      {/* <p className="card-text fs-6">{product.description}</p> */}
                    </div>
                    <div className="mb-1">
                      <h5 className="text-green-600  font-bold">
                        Rp. {product.price}
                      </h5>
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <p className=" text-black-50">
                        ★ {product.average_rating} | {product.rater} rating
                      </p>
                    </div>
                    {/* <Link
                      to={`/product/${product.id}`}
                      className="bg-blue-600 text-white rounded-md shadow-md p-2 py-1 w-fit"
                    >
                      View Detail
                    </Link> */}
                    <div className="flex flex-row gap-1 items-center">
                      <img className="h-4 w-4" src="/location.jpg" />
                      <h1>
                        {product.seller.address?.find(
                          (addr) => addr.is_default === 1
                        ) && (
                          <div>
                            {
                              product.seller.address?.find(
                                (addr) => addr.is_default === 1
                              ).subdistrict_name
                            }
                          </div>
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Pagination data={modelPagination} fetchDataWithUrl={fetchData} />

      <Footer />
    </div>
  );
}

export default Products;
