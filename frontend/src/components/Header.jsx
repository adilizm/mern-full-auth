import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, requestVerification } from "../redux/slices/usersSlice";
import { store } from "../redux/store";
import toast from "react-hot-toast";
import EmailVerification from "./modals/EmailVerification";
import { Link } from "react-router-dom";
const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  var [openEmailVerification, setOpenEmailVerification] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logoutUser({}))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => console.error("Logout error:", err));
  };

  const handelClickVerify = () => {
    setOpenEmailVerification(true);

    dispatch(requestVerification({}))
      .unwrap()
      .then(() => setOpenEmailVerification(true))
      .catch((err) => console.error("Logout error:", err));
  };
  useEffect(() => {
    console.log("openEmailVerification updated:", openEmailVerification);
  }, [openEmailVerification]);

  return (
    <header className="bg-white">
      <EmailVerification
        is_open={openEmailVerification}
        onClose={() => setOpenEmailVerification(false)}
      />

      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Product
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link className="text-sm/6 font-semibold text-gray-900" to="/blog">
            Blog
          </Link>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Contact
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-1">
          {useAuth() == true ? (
            <>
              <Popover className="relative">
                <PopoverButton className="flex items-center outline-0 gap-x-1 text-sm/6 font-semibold text-gray-900">
                  <img
                    alt=""
                    src={
                      import.meta.env.VITE_API_BASE_URL +
                      "/" +
                      store.getState().users.user.profile
                    }
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <span className="text-sm/6 font-semibold text-gray-900">
                    {store.getState().users.user.username}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none text-gray-400"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute top-full right-8 z-10 mt-3 w-screen max-w-40 overflow-hidden rounded-md bg-white ring-1 shadow-md ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  {store.getState().users.user.isVerified == false ? (
                    <>
                      {" "}
                      <div className=" bg-gray-50 flex hover:bg-gray-100 text-gray-700 hover:text-gray-900 ">
                        <a
                          href="#"
                          onClick={handelClickVerify}
                          className=" w-full flex items-center px-4 pt-2 text-sm/6 font-semibold "
                        >
                          Verify Email
                        </a>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className=" bg-gray-50 flex hover:bg-gray-100 text-gray-700 hover:text-gray-900 ">
                    <a
                      href="#"
                      onClick={handelLogout}
                      className=" w-full flex items-center px-4 pt-2 text-sm/6 font-semibold "
                    >
                      Profile
                    </a>
                  </div>
                  <div className=" bg-gray-50 flex hover:bg-gray-100 text-gray-700 hover:text-gray-900 ">
                    <Link
                      to="/myposts"
                      className=" w-full flex items-center px-4 pt-2 text-sm/6 font-semibold "
                    >
                      My posts
                    </Link>
                  </div>
                  <div className=" bg-gray-50 flex hover:bg-gray-100 text-gray-700 hover:text-gray-900 ">
                    <Link
                      to="/conversations"
                      className=" w-full flex items-center px-4 pt-2 text-sm/6 font-semibold "
                    >
                      Conversations
                    </Link>
                  </div>
                  <div className=" bg-gray-50 flex hover:bg-gray-100 text-gray-700 hover:text-gray-900 ">
                    <a
                      href="#"
                      onClick={handelLogout}
                      className=" w-full  px-4 py-2 text-sm/6 font-semibold "
                    >
                      Log out
                    </a>
                  </div>
                </PopoverPanel>
              </Popover>
            </>
          ) : (
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure> */}

                {store.getState().users.user.isVerified == false ? (
                  <>
                    {" "}
                    <div className="flex hover:bg-gray-100 text-gray-700 hover:text-gray-900 ">
                      <a
                        href="#"
                        onClick={handelClickVerify}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Verify Email
                      </a>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <Link
                  to="/myposts"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  My posts
                </Link>
                <Link
                  to="/conversations"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Conversations
                </Link>
              </div>
              <div className="py-6">
                {useAuth() == true ? (
                  <a
                    href="#"
                    onClick={handelLogout}
                    className=" w-full  px-4 py-2 text-sm/6 font-semibold "
                  >
                    Log out
                  </a>
                ) : (
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
