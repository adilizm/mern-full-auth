import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { SearchUser } from "../redux/slices/usersSlice";
import { selectReceiver } from "../redux/slices/conversationSlice";

function UsersList({ list_searched }) {
  const dispatch = useDispatch();
  const online_users = useSelector((state) => state.sockets.online_users);

  const select_receiver = (username) => {
    dispatch(selectReceiver({ username }));
  };
  return list_searched.map((user) => (
    <li
      key={user.username}
      onClick={() => {
        select_receiver(user.username);
      }}
      className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
    >
      <div className="flex space-x-3">
        <div className=" relative">
          <img
            className="rounded-full w-10 h-10"
            src={import.meta.env.VITE_API_BASE_URL + "/" + user.profile}
            alt=""
          />
          <span
            className={`w-2.5 h-2.5 rounded-full absolute right-0.5 bottom-0.5 border-2 border-white ${
              online_users.includes(user._id)
                ? "bg-green-500"
                : "bg-red-600"
            }`}
          ></span>
        </div>
        <div className="flex items-center  ">
          <span className="text-md font-semibold">{user.username}</span>
        </div>
      </div>
    </li>
  ));
}

function SearchContact({ is_open, ontoggle_searching }) {
  const dispatch = useDispatch();
  const list_searched = useSelector((state) => state.users.list_searched_users);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [is_loading, setIs_loading] = useState(false);
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      setIs_loading(true);
      dispatch(SearchUser({ keyword: debouncedSearch }))
        .unwrap()
        .then(() => {
          setIs_loading(false);
        })
        .catch((err) => {
          console.error("Logout error:", err);
          setIs_loading(false);
        });
    }
  }, [debouncedSearch]);

  return (
    <div className="border border-gray-200 rounded-md md:col-span-2    z-20  bg-white p-2">
      <div className="flex w-full items-center h-10 ">
        <div className="relative flex h-12  w-full">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-0 left-4 h-full w-5 fill-slate-400 dark:fill-slate-500"
          >
            <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z"></path>
          </svg>
          <input
            className="flex-auto w-full appearance-none bg-transprent pl-12 text-slate-900 outline-hidden  placeholder:text-slate-400 focus:flex-none sm:text-sm dark:text-white pr-4"
            placeholder="Search for contact..."
            maxLength="50"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="z-10 h-8 w-8 flex items-center justify-center"
          onClick={() => {
            ontoggle_searching();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <ul className="flex flex-col space-y-2">
        {is_loading ? (
          <>
            <div className="-lg my-1.5  w-full max-w-xs rounded-lg bg-white dark:bg-gray-800">
              <div className="flex animate-pulse space-x-4">
                <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-lg  my-1.5 w-full max-w-xs rounded-lg bg-white dark:bg-gray-800">
              <div className="flex animate-pulse space-x-4">
                <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-lg  my-1.5 w-full max-w-xs rounded-lg bg-white dark:bg-gray-800">
              <div className="flex animate-pulse space-x-4">
                <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <UsersList list_searched={list_searched} />
        )}
      </ul>
    </div>
  );
}

export default SearchContact;
