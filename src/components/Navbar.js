import { Link } from "react-router";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className=" h-[5vh] flex items-center w-full border-b-2 border-black text-black">
      <div className="mx-10 w-full flex flex-direction gap-5">
        <a className="" href="/">
          KRNJG
        </a>
        {/* <button
          className=""
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""></span>
        </button> */}
        <div
          className="flex w-full flex-direction justify-between"
          id="navbarNavDropdown"
        >
          <ul className="flex flex-direction gap-1">
            <li className="">
              <a className="" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="">
              <a className="active" href="/products">
                Products
              </a>
            </li>
            {token && (
              <li className="">
                <a className="" href="/dashboard">
                  Dashboard
                </a>
              </li>
            )}
          </ul>
          <ul className="flex flex-direction ">
            {token ? (
              <li className="">
                <Link className="" to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </Link>
              </li>
            ) : (
              <li className=" ">
                <Link to={`/login`} className="">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
