import { useNavigate } from "react-router";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShippingListButton from "../components/ShippingListButton";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../utils/token";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [shippingCosts, setShippingCosts] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    await axios
      .get("/cart")
      .then((response) => {
        // console.log(response.data.data);
        setCart(response.data.data);
      })
      .catch((error) => {
        console.log(
          "Error fetching data",
          error.response.status,
          error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) => {
      const updatedItems = prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id];

      // langsung pakai updatedItems untuk API
      shippingList(updatedItems);

      return updatedItems;
    });
  };

  const updateQuantity = async (id, type) => {
    // console.log(cart);
    const seller = cart.find((c) => c.data.some((item) => item.id === id));

    if (!seller) return;

    const item = seller.data.find((d) => d.id === id);

    if (!item) return;

    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

    // jika < 1, hapus dari cart
    if (newQty < 1) {
      await axios.delete(`/cart/${id}`);
      setCart(
        (prevCart) =>
          prevCart
            .map((seller) => ({
              ...seller,
              data: seller.data.filter((product) => product.id !== id),
            }))
            .filter((seller) => seller.data.length > 0) // hapus seller kosong
      );
    } else {
      await axios.put(`/cart/${id}`, { quantity: newQty });
      setCart((prevCart) =>
        prevCart.map((seller) => ({
          ...seller,
          data: seller.data.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity: newQty,
                  sub_total: newQty * product.product.price,
                }
              : product
          ),
        }))
      );
    }
  };

  const totalPrice = cart.reduce((sum, seller) => {
    return (
      sum +
      seller.data
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sellerSum, item) => sellerSum + item.sub_total, 0)
    );
  }, 0);

  // console.log(
  //   Object.values(shippingCosts).reduce(
  //     (sum, item) => (sum = sum + (item?.cost || 0)),
  //     0
  //   )
  // );
  const totalShippingCost = Object.values(shippingCosts).reduce(
    (sum, item) => (sum = sum + (item?.cost || 0)),
    0
  );
  const totalCost = totalPrice + totalShippingCost;

  const shippingList = async (selectedItems) => {
    try {
      const response2 = await axios.get("/list-shipping", {
        params: {
          "cart_item_ids[]": selectedItems,
        },
      });
      // console.log(response2.data.sellers);
      setShippingData(response2.data.sellers);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
      // Filter hanya cart yang masih ada di state cart
      // const validSelectedItems = selectedItems.filter((id) =>
      //   cart.some((item) => item.id === id)
      // );

      // if (validSelectedItems.length === 0) {
      //   alert("Tidak ada item valid untuk checkout.");
      //   return;
      // }

      const payload = {
        cart_item_ids: selectedItems,
        shipping_cost: Object.keys(shippingCosts).reduce((acc, sellerId) => {
          acc[sellerId] = shippingCosts[sellerId].cost;
          return acc;
        }, {}),
      };
      const response = await axios.post("/checkout", payload);

      console.log("Checkout success:", response.data);
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    fetchCart();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!cart) return <div>keranjang masih kosong</div>;
  //   if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="mx-20 p-2">
        <h1 className="mx-5 mt-5 text-black text-3xl font-bold">
          Shopping Cart
        </h1>

        <div className="flex flex-row h-full mt-5">
          <div className="mx-5" style={{ width: "65%" }}>
            <div className="flex flex-col justify-center w-full ">
              {cart.map((seller) => (
                <div className="mb-10 w-full border border-black rounded-md">
                  <div className="px-2">
                    <h1 className="text-2xl text-black">
                      {seller.seller.name}
                    </h1>
                  </div>
                  <hr className="border border-gray-600 " />
                  <div className="">
                    <div className="w-full">
                      <div
                      // style={{
                      //   height: "fit",
                      //   // maxHeight: "412px",
                      //   overflowY: "auto",
                      // }}
                      >
                        {/* isi */}
                        {seller.data.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={updateQuantity}
                            onCheckboxChange={handleCheckboxChange}
                            selectedItems={selectedItems}
                          />
                        ))}

                        {/* <div></div> */}
                      </div>
                    </div>
                  </div>
                  <ShippingListButton
                    className="w-full"
                    sellerId={seller.seller.id}
                    shippingData={shippingData}
                    setShippingCosts={setShippingCosts}
                    selectedItems={selectedItems}
                    dataPerSeller={seller.data}
                    shippingCost={shippingCosts[seller.seller.id]?.cost || 0}
                    shippingLabel={shippingCosts[seller.seller.id]?.label || ""}
                    shippingEtd={shippingCosts[seller.seller.id]?.etd || ""}
                    shippingService={
                      shippingCosts[seller.seller.id]?.service || ""
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div
            className="bg-slate-50 border rounded-xl shadow-md h-fit"
            style={{ width: "35%" }}
          >
            <div className="my-5 mx-3 flex flex-col">
              <div>
                <h1 className="text-black font-bold text-3xl">Order Summary</h1>
              </div>
              <hr className="border border-3 my-3 border-gray-600" />
              <div className="flex flex-col justify-center  text-gray-600 gap-3 ">
                <div className="flex flex-row justify-between ">
                  <h1 className="font-bold text-black">TOTAL PRICE</h1>
                  <h1>
                    {Number(totalCost).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </h1>
                </div>
                <div className="w-full">
                  <h1 className="font-bold text-black">PROMO CODE</h1>
                  <div className="flex flex-row w-full">
                    <form className="w-full">
                      <input
                        className="form-control border border-gray-600 rounded-md rounded-r-none w-full border-e-0 px-1"
                        placeholder="Enter code"
                      />
                    </form>
                    <button className=" bg-black text-white text-center  rounded-md rounded-l-none px-1 hover:bg-transparent hover:text-black hover:border hover:border-gray-600">
                      Submit
                    </button>
                  </div>
                </div>

                <hr className="my-3 border border-3 border-gray-600" />
                <button
                  className="rounded-md bg-black text-white text-center hover:bg-transparent hover:text-black hover:border hover:border-gray-600"
                  onClick={handleCheckout}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
