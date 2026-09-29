import React from "react";

function CartItem({ item, onQuantityChange, onCheckboxChange, selectedItems }) {
  // const totalSubItem = Object.values(item.sub_total).reduce(
  //   (sum, sc) => sum + (sc?.cost || 0),
  //   0
  // );

  // console.log(selectedItems);

  return (
    <div className="h-fit">
      <div className="flex flex-row gap-3 w-full items-start px-5">
        <div className="form-check" style={{ width: "1%" }}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`check-${item.id}`}
            checked={selectedItems.includes(item.id)}
            onChange={() => onCheckboxChange(item.id)}
          />
          <label
            className="form-check-label"
            htmlFor={`check-${item.id}`}
          ></label>
        </div>
        <div
          className="m-2"
          style={{
            width: "15%",

            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: "0.5rem",
            flexShrink: 0,
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            src={`http://localhost:8000/storage/uploads/products/${item.product.thumbnail?.image}`}
            alt="img product"
          />
        </div>
        <div className="flex flex-col" style={{ width: "84%" }}>
          <div className="mb-3">
            <h1 className="text-2xl text-slate-700">{item.product.name}</h1>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl text-green-600">
                {Number(item.sub_total).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h1>
            </div>
            <div
              className=" flex flex-row text-2xl gap-3 text-slate-700"
              style={{ width: "fit-content" }}
            >
              <button
                className=" text-black flex flex-row items-center justify-center"
                onClick={() => onQuantityChange(item.id, "dec")}
              >
                <h1 className="hover:text-slate-500 ">-</h1>
              </button>
              <div className="flex flex-row items-center border-b-2 border-slate-700">
                <h1>{item.quantity}</h1>
              </div>
              <button
                className=" text-black flex flex-row items-center justify-center"
                onClick={() => onQuantityChange(item.id, "inc")}
              >
                <h1 className="hover:text-slate-500">+</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-gray-600 " />
    </div>
  );
}

export default React.memo(CartItem);
// export default CartItem;
