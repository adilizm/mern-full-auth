import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useDispatch } from "react-redux";

import toast, { Toaster } from "react-hot-toast";

import { useRef, useEffect } from "react";
import { deletePost } from "../../redux/slices/postsSlice";

export default function Deletepost({ is_open, onClose, post }) {
  const dispatch = useDispatch();

  const title = useRef();


  useEffect(() => {
    if (post) {
      title.current.value = post.title;
    }
  }, [post]);

  const submitform = (e) => {
    e.preventDefault();

    dispatch(deletePost({ slug: post.slug }))
      .unwrap()
      .then(() => {
        toast.success("post deleted ", {
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
        console.log("deleting error:", err.message);
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
    return <></>;
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
              className="relative transform overflow-hidden rounded-lg bg-white border-2 border-red-500 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form onSubmit={submitform} className="p-4">
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-base/7 font-semibold text-red-700 ">
                      Confirm delete
                    </h1>

                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-6 w-full">
                        <label
                          htmlFor="title"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          are you sure you want to delete post with title
                        </label>
                        <div className="mt-2 w-full  ">
                          <div className="flex items-center  rounded-md bg-gray-200 pl-3 outline-0  focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-none">
                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                            <input
                              id="title"
                              readOnly="true"
                              name="title"
                              type="text"
                              ref={title}
                              placeholder=""
                              className="block w-full min-w-0  grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                          </div>
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
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nonde"
                  >
                    Confirm
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
