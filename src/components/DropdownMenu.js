import { useEffect, useRef, useState } from "react";

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // handleClickOutside();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-xl font-bold text-gray-700"
      >
        <strong>:</strong>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            href="#"
          >
            Edit
          </button>

          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            href="#"
          >
            Delete
          </button>

          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            href="#"
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
