import axios from "../utils/axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import RatingDetail from "../components/RatingDetail";
import Comment from "../components/Comment";
import Quantity from "../components/Quantity";
import Footer from "../components/Footer";

function ProductDetail({ cart, setCart }) {
  const { id } = useParams(); //ambil ID dari URL
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [isMyWishlist, setIsMyWishlist] = useState([]);
  const productId = parseInt(id);
  const token = localStorage.getItem("token");

  const fetchDetailProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/product/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.log(
        "error fetching data ",
        error.response.status || error.message
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      alert("Anda belum login");
      return;
    }
    const payload = {
      product_id: product.id,
      quantity: selectedQty > 0 ? selectedQty : 1,
    };

    try {
      const response = await axios.post(
        "/cart",
        payload
        // karena axios sudah di inject token maka dari itu tidak membutuhkan dibawah ini
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log("Berhasil ditambahkan ke cart:", response.data);
      // opsional: update cart state lokal jika ingin disimpan
      //  setCart([...cart, {...product, qty:payload.quantity}]);

      alert("Product berhasil ditambahkan ke keranjang");
    } catch (error) {
      console.log(
        "Gagal tambah ke cart:",
        error.response?.data || error.message
      );
      alert("Gagal menambahakan ke keranjang");
    }
  };

  const handleWishlist = useCallback(async () => {
    if (!token) {
      alert("anda harus login terlebih dahulu");
      return;
    }
    try {
      const response = await axios.get("/mywhislist");
      setIsMyWishlist(
        response.data.data.find((item) => item.product_id === productId)
      );
    } catch (error) {
      console.log(
        "gagal mengambil user wishlist",
        error.response?.data || error.message
      );
    }
  }, [token, productId]);

  const toggleWishlist = async () => {
    try {
      if (!isMyWishlist) {
        await axios.post(`mywhislist/product/${id}`);
        alert("product berhasil ditambahkan kedalam wishlist");
      } else {
        await axios.delete(`mywhislist/product/${id}`);
        alert("product berhasil dihapus dari wishlist");
      }
      await fetchDetailProduct();
      await handleWishlist();
    } catch (error) {
      console.log("terjadi kesalahan:", error.response?.data || error.message);
      alert("gagal kegagalan saat proses update wishlist");
    }
  };

  useEffect(() => {
    handleWishlist();
  }, [handleWishlist]);
  useEffect(() => {
    fetchDetailProduct();
  }, [id, fetchDetailProduct]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produk tidak ditemukan.</p>;

  return (
    <div>
      <Navbar />
      <div className="mx-20" style={{ padding: "2rem" }}>
        <div className=" flex flex-row gap-5 h-screen">
          <Gallery className=" h-full" product={product} />
          <div className="w-[60%] h-full overflow-y-scroll">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div className="my-4 flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 items-center">
                <h1 className="text-gray-600">PRICE:</h1>
                <h1 className="text-green-600">Rp. {product.price}</h1>
              </div>
              <div className="flex flex-row justify-end gap-2 w-fit items-center mx-10">
                <h1 className="text-lg">{product.whislist_count}</h1>
                <button
                  type="submit"
                  className="w-fit h-fit"
                  onClick={toggleWishlist}
                >
                  {isMyWishlist ? (
                    <img
                      className="w-5 h-5"
                      alt="Is Wishlist Active"
                      src="/heart_black.png"
                    />
                  ) : (
                    <img
                      className="w-5 h-5"
                      alt="Is Wishlist not Active"
                      src="/heart_gray.png"
                    />
                  )}
                </button>
              </div>
            </div>
            <hr className="" />
            <div>
              <h1>Description:</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div>
              <h1 className="text-gray-600">
                Stock: <span className="text-black">{product.stock}</span>
              </h1>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h1 className="text-gray-600" style={{ marginBottom: "1rem" }}>
                Category:
              </h1>
              <div className="flex flex-row gap-2">
                {product.category.map((category, i) => {
                  return (
                    <div key={i}>
                      <span
                        style={{
                          border: "1px solid black",
                          padding: "4px",
                          borderRadius: "0.5rem",
                        }}
                      >
                        {category.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <RatingDetail id={product.id} />

            <Quantity quantity={selectedQty} setQuantity={setSelectedQty} />

            <div className="flex flex-row text-center">
              <button
                className="bg-black text-white rounded-s-md border border-black hover:bg-white hover:text-black"
                onClick={addToCart}
                style={{ width: "60%" }}
              >
                Add to Cart
              </button>
              <button
                className="bg-white rounded-e-md text-black  border border-black hover:bg-black hover:text-white"
                style={{ width: "40%" }}
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 mt-3 border border-radius rounded bg-white">
          <Comment id={product.id} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
