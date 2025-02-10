import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import moment from "moment";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { getMyPosts } from "../../redux/slices/postsSlice";
import toast from "react-hot-toast";
import { store } from "../../redux/store";
import Newpost from "../../components/modals/Newpost";
import { Link } from "react-router-dom";
import Editpost from "../../components/modals/Editpost";
import Deletepost from "../../components/modals/Deletepost";

const Posts = () => {
  const [posts, setposts] = useState([]);
  const [postToEdit, setpostToEdit] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [creatingNewPost, setCreatingNewPost] = useState(false);

  const dispatch = useDispatch();
  const fetchPosts = () => {
    dispatch(getMyPosts({}))
      .unwrap()
      .then((res) => {
        setposts(store.getState().posts.posts);
      })
      .catch((err) => {
        console.error(err);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handelCreatingPost = (status) => {
    if (status) {
      setCreatingNewPost(!creatingNewPost);
      fetchPosts();
    } else {
      setCreatingNewPost(!creatingNewPost);
    }
  };

 
  return (
    <>
      <Header />
      <Newpost
        is_open={creatingNewPost}
        onClose={(status = false) => {
          handelCreatingPost(status);
        }}
      />
      <Editpost
        post={postToEdit}
        is_open={postToEdit != null}
        onClose={()=>{setpostToEdit(null), fetchPosts();}}
      />
      <Deletepost
        post={postToDelete}
        is_open={postToDelete != null}
        onClose={()=>{setPostToDelete(null), fetchPosts();}}
      />

      <div className=" max-w-4xl mx-auto">
        <div className="flex my-4 items-end justify-between gap-4">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
            Posts
          </h1>
          <button
            className="-my-0.5 relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6 focus:outline-hidden  data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500 data-disabled:opacity-50 *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText] border-transparent bg-(--btn-border) dark:bg-(--btn-bg) before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg) before:shadow-sm dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)] after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)] data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay) dark:after:-inset-px dark:after:rounded-lg data-disabled:before:shadow-none data-disabled:after:shadow-none text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10 dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5 [--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)] cursor-default"
            type="button"
            data-headlessui-state=""
            onClick={() => handelCreatingPost()}
          >
            <span
              className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
              aria-hidden="true"
            ></span>
            New post
          </button>
        </div>

        <div className="inline-block min-w-full align-middle sm:px-(--gutter)">
          <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
            <thead className="text-zinc-500 dark:text-zinc-400">
              <tr className="">
                <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                  image
                </th>

                <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                  Title
                </th>
                <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                  Created At
                </th>

                <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%] hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]"
                >
                  <td className="relative px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                    <img
                      src={
                        import.meta.env.VITE_API_BASE_URL + "/" + post?.image
                      }
                      className="w-22 rounded-md"
                      alt=""
                    />
                  </td>
                  <td className="text-zinc-500 relative px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                    <Link to={"/blog/" + post.slug}> {post.title}</Link>
                  </td>
                  <td className="relative px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                    {moment(post?.createdAt).format("dddd, MMMM D, YYYY")}
                  </td>
                  <td className="relative px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>setpostToEdit(post)} className="inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)] rounded-lg border border-transparent ring-1 shadow-sm ring-black/10 text-sm font-medium whitespace-nowrap text-gray-950 data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-gray-50">
                        {" "}
                        <PencilIcon className="w-3" />{" "}
                      </button>
                      <button onClick={()=>setPostToDelete(post)} className="inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)] rounded-lg border border-transparent ring-1 shadow-sm ring-black/10 text-sm font-medium whitespace-nowrap text-white data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-red-400 bg-red-700">
                        {" "}
                        <TrashIcon className="w-3" />{" "}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Posts;
