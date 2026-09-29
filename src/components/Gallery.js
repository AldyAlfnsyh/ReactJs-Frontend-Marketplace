import axios from "axios";

import { useEffect, useState } from "react";

function Gallery({ product }) {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const fetchImages = async () => {
    axios
      .get(`http://localhost:8000/api/product/${product.id}/images`)
      .then((response) => {
        const imgList = response.data.data;
        // console.log(imgList);
        setImages(imgList);
        const thumbnailImage = imgList.find((img) => img.is_thumbnail === 1);

        if (thumbnailImage) {
          setMainImage(thumbnailImage);
        } else if (imgList.length > 0) {
          setMainImage(imgList[0]);
        }
      })
      .catch((error) => {
        console.log("Error fetching data", error.message);
      });
  };

  useEffect(() => {
    fetchImages();
  }, [product.id]);
  return (
    <div className="w-[40%] h-full">
      <div
        className="ecommerce-gallery h-full w-full"
        data-mdb-ecommerce-gallery-init
        data-mdb-zoom-effect="true"
        data-mdb-auto-height="true"
      >
        <div className="flex flex-col pb-3 h-full w-full">
          <div className="h-[70%] w-full mb-1 ">
            <div className="lightbox h-full w-full" data-mdb-lightbox-init>
              <img
                src={`http://localhost:8000/storage/uploads/products/${mainImage.image}`}
                alt="Main Gallery"
                className="ecommerce-gallery-main-img active h-full w-full object-fit"
              />
            </div>
          </div>
          <div className="h-[30%] gap-2 flex flex-row w-full justify-center">
            {images.map((img) => (
              <div key={img.id} className=" mt-1 rounded h-[auto] w-[33%]">
                <img
                  src={`http://localhost:8000/storage/uploads/products/${img.image}`}
                  alt={`Thumbnail ${img.id}`}
                  className={` w-full h-full object-fit cursor-pointer ${
                    mainImage?.id === img.id
                      ? "border border-3 border-gray-600"
                      : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
