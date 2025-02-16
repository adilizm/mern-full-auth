import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slices/usersSlice";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forminputs, setInputes] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const profilefile = useRef();

  const handelInput = (e) => {
    if (e.target.name == "profile") {
    } else {
      setInputes({ ...forminputs, [e.target.name]: e.target.value });
    }
  };

  const handelClick = (e) => {
    e.preventDefault();
    console.log("profilefile = ", profilefile);
    profilefile.current.click();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputes({ ...forminputs, profile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitform = (e) => {
    e.preventDefault();
    setIsloading(true);
    dispatch(registerUser(forminputs))
      .unwrap()
      .then(() => navigate("/blog"))
      .catch((err) => {
        setIsloading(false);
        console.log("register error:", err.message);
        toast.error(err.message, {
          duration: 4000,
          style: {
            border: "1px solid red",
            padding: "6px",
            color: "red",
          },
          position: "top-right",
        });
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          you have s an account{" "}
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            to="/login"
          >
            login
          </Link>
        </p>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={submitform}
            action="#"
            method="POST"
            className="space-y-3"
          >
            <input
              type="file"
              ref={profilefile}
              className="sr-only"
              name="profile"
              onChange={handleProfileChange}
              accept="image/*"
            />
            <div
              onClick={handelClick}
              className="w-20 mx-auto rounded-full cursor-pointer overflow-hidden bg-gray-200 text-gray-400"
            >
              {imagePreview != null ? (
                <>
                  {" "}
                  <img src={imagePreview} alt="profile" />{" "}
                </>
              ) : (
                <>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="pe baq"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  onKeyUp={handelInput}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onKeyUp={handelInput}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onKeyUp={handelInput}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading === true}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <>Loading</> : <>Create Account</>}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            by creating an account you agree on our{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              terms and Privacy
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
