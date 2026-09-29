import { useState } from "react";

function Quantity({ quantity, setQuantity }) {
  // const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // incremenet quantity
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // Decrement, tapi gk sampe dibawah 1
  };

  return (
    <div className="m-1 flex flex-row items-center gap-2 text-gray-600 text-xl mb-3">
      <h1 className="flex flex-row items-center ">Quantity :</h1>
      <button
        className=" py-0 flex flex-row items-center"
        onClick={handleDecrement}
      >
        <h1>-</h1>
      </button>
      <h1>{quantity}</h1>
      <button
        className="py-0 flex flex-row items-center"
        onClick={handleIncrement}
      >
        <h1>+</h1>
      </button>
    </div>
  );
}

export default Quantity;
