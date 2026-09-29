import { useEffect, useRef, useState } from "react";

function ShippingListButton({
  shippingData,
  sellerId,
  setShippingCosts,
  selectedItems,
  shippingCost,
  shippingLabel,
  shippingDesc,
  shippingEtd,
  shippingService,
  dataPerSeller,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const total_price_per_item = dataPerSeller
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
      (perSellerSum, item) => (perSellerSum = perSellerSum + item.sub_total),
      0
    );

  // console.log(total_price_per_item + shippingCost);
  const totalCost = total_price_per_item + shippingCost;

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cost, label, desc, etd, service) => {
    setShippingCosts((prev) => ({
      ...prev,
      [sellerId]: { cost, label, desc, etd, service },
    }));
    setOpen(false);
  };

  return (
    <div className="flex flex-row">
      <div className="w-[50%]">
        <div className="flex flex-col px-2">
          <h1 className="font-bold text-black w-full">SHIPPING OPTION</h1>
          <div ref={ref} className="w-full">
            <button
              onClick={() => setOpen(!open)}
              className="bg-black border rounded-md text-white w-full p-2 text-sm"
            >
              {!shippingLabel && !shippingEtd && !shippingDesc ? (
                <h1 className="font-bold">Pilih Shipping</h1>
              ) : (
                <div className="flex flex-row justify-between ">
                  <div className="text-start">
                    <p>
                      <strong>
                        {shippingDesc} ({shippingService})
                      </strong>
                    </p>
                    <p>{shippingLabel}</p>
                    <p>{shippingEtd}</p>
                  </div>
                  <div>
                    <p>
                      <strong>
                        {Number(shippingCost).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
              )}
            </button>

            {open && (
              <div className="w-full">
                {shippingData
                  .filter((item) => item.seller_id === sellerId)
                  .map((item) => (
                    <div
                      key={item.seller_id}
                      className="bg-slate-100 border rounded-2xl flex flex-col"
                    >
                      {item.data.map((itemm, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => {
                            handleSelect(
                              itemm.cost,
                              itemm.name,
                              itemm.description,
                              itemm.etd,
                              itemm.service
                            );
                          }}
                          className="p-2 border-b "
                        >
                          <div className="flex flex-row justify-between">
                            <div className="text-start">
                              <p>
                                <strong>
                                  {itemm.description} ({itemm.service})
                                </strong>
                              </p>
                              <p>{itemm.name}</p>
                              <p>{itemm.etd}</p>
                            </div>
                            <div>
                              <p>
                                <strong>
                                  {Number(itemm.cost).toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </strong>
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <vr className="border border-3 border-black"></vr>
      <div className=" flex flex-col w-[50%]">
        <h1 className="text-black font-bold mx-2">ORDER ITEM</h1>
        <div className="flex flex-row justify-between mx-2">
          <div className="  text-black">
            <h1>Sub Total</h1>
          </div>

          <div className="w-[50%] text-end text-slate-600">
            <h1>
              {Number(total_price_per_item).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </h1>
          </div>
        </div>
        <div className="flex flex-row justify-between mx-2">
          <div className="  text-black">
            <h1>Shipping Cost</h1>
          </div>

          <div className="w-[50%]   text-end text-slate-600">
            <h1>
              {Number(shippingCost).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </h1>
          </div>
        </div>
        <hr className="border my-1 border-3 border-black"></hr>
        <div className="flex flex-row justify-between mx-2">
          <h1 className="text-black   font-bold text-2xl">Total Cost</h1>
          <h1 className="text-end text-slate-600   font-bold text-2xl">
            {Number(totalCost).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ShippingListButton;
