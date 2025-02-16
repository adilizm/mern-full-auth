import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

function Postsmap({posts,setpostToEdit,setPostToDelete}) {
  return (
    <>  {posts.map((post) => (
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
      ))}</>
  )
}

export default Postsmap