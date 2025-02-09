import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useDispatch } from "react-redux";

import toast, { Toaster } from "react-hot-toast";

import { useState, useRef, useEffect } from "react";
import { createNewPost, getMyPosts, updatePost } from "../../redux/slices/postsSlice";

export default function Editpost({ is_open, onClose, post }) {
  const dispatch = useDispatch();

  const [forminputs, setInputes] = useState({});
  const imagefile = useRef();
  const title = useRef();
  const image = useRef();
  const content = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setImagePreview(null);
  }, [is_open]);
  useEffect(() => {
    if (post) {
      title.current.value = post.title;
      content.current.value = post.content;
      image.current.value = post.image;
      setInputes({ ...forminputs, title: post.title });
      setInputes({ ...forminputs, content: post.content });
      setInputes({ ...forminputs, slug: post.slug });
    }
  }, [post]);
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
  
    dispatch(updatePost(forminputs))
      .unwrap()
      .then(() => {
        toast.success("post Updated ", {
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
        console.log("update error:", err.message);
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
  if (post == null) {
    return (<></>);
  }
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
                      Edit post
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
                              ref={title}
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
                          {image != null && imagePreview == null ? (
                            <>
                              {" "}
                              <img
                                ref={image}
                                src={
                                  import.meta.env.VITE_API_BASE_URL +
                                  "/" +
                                  post?.image
                                }
                                alt="image"
                              />{" "}
                            </>
                          ) : imagePreview ? (
                            <>
                              {" "}
                              aa
                              <img src={imagePreview} alt="image" />{" "}
                            </>
                          ) : (
                            <>
                              <div className="w-full border-dashed border h-50  flex items-center justify-center">
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="w-80"
                                >
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
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
                            ref={content}
                            name="content"
                            onKeyUp={handelInput}
                            rows={10}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
