import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useDispatch } from "react-redux";

import toast, { Toaster } from "react-hot-toast";

import { useState, useRef, useEffect } from "react";
import { createNewPost } from "../../redux/slices/postsSlice";

export default function Newpost({ is_open, onClose }) {
  const dispatch = useDispatch();

  const [forminputs, setInputes] = useState({});
  const imagefile = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const handelInput = (e) => {
    if (e.target.name == "image") {
    } else {
      setInputes({ ...forminputs, [e.target.name]: e.target.value });
    }
  };

  const handelClick = (e) => {
    e.preventDefault();
    imagefile.current.click();
  };

  const handleimageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file = ", file);
      setInputes({ ...forminputs, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitform = (e) => {
    e.preventDefault();

    dispatch(createNewPost(forminputs))
      .unwrap()
      .then(() => {
        toast.success("new Post Created ", {
          duration: 4000,
          style: {
            border: "1px solid red",
            padding: "6px",
            color: "red",
          },
          position: "top-right",
        });
        onClose(true);
      })
      .catch((err) => {
        console.log("creating error:", err.message);
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
      <Dialog open={is_open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form onSubmit={submitform} className="p-4">
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-base/7 font-semibold text-gray-900 ">
                      New post
                    </h1>

                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-6 w-full">
                        <label
                          htmlFor="title"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Title <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2 w-full  ">
                          <div className="flex items-center  rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                            <input
                              id="title"
                              onKeyUp={handelInput}
                              name="title"
                              type="text"
                              placeholder=""
                              className="block w-full min-w-0  grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Post Image
                        </label>
                        <input
                          type="file"
                          ref={imagefile}
                          className="sr-only"
                          name="image"
                          onChange={handleimageChange}
                          accept="image/*"
                        />
                        <div
                          onClick={handelClick}
                          className="mx-auto rounded-md border-dashed cursor-pointer overflow-hidden  bg-gray-50 text-gray-400"
                        >
                          {imagePreview != null ? (
                            <>
                              {" "}
                              <img src={imagePreview} alt="image" />{" "}
                            </>
                          ) : (
                            <>
                              <div className="w-full border-dashed border h-50  flex items-center justify-center">
                                <svg
                                  width="129px"
                                  height="129px"
                                  viewBox="0 0 120.00 120.00"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  stroke="#dedede"
                                  strokeWidth="0.0012000000000000001"
                                  transform="rotate(0)"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <rect
                                      width="120"
                                      height="120"
                                      fill="#ffffff"
                                    ></rect>{" "}
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z"
                                      fill="#dedede"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="content"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Content <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="content"
                            name="content"
                            onKeyUp={handelInput}
                            rows={10}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => onClose()}
                    type="button"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
}
