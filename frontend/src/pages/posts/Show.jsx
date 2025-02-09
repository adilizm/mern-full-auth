
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPost } from "../../redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function Show() {
  const { slug } = useParams(); // Get post ID from URL
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);
  useEffect(() => {
    dispatch(getPost(slug));
  }, [dispatch, slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl lg:max-w-7xl relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <h2 className=" font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase data-dark:text-gray-400">
          {moment(post?.createdAt).format("dddd, MMMM D, YYYY")}
        </h2>
        <h1 className="mt-2 text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl">
          {post.title}
        </h1>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            <div className="flex items-center gap-3">
              <img
                alt=""
                src={ import.meta.env.VITE_API_BASE_URL +
                  "/" +
                  post?.owner.profile}
                className="aspect-square size-6 rounded-full object-cover"
              />
              <div className="text-sm/5 text-gray-700">{post.owner.username}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                data-headlessui-state=""
                href="/blog?category=insights"
              >
                Insights
              </a>
              <a
                className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                data-headlessui-state=""
                href="/blog?category=knowledge"
              >
                Knowledge
              </a>
            </div>
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              <img
                alt="A crossed out European emblem"
                src={import.meta.env.VITE_API_BASE_URL + "/" + post.image}
                className="mb-10 aspect-3/2 w-full rounded-2xl object-cover shadow-xl"
              />
               <p className="my-10 text-base/8 first:mt-0 last:mb-0">
               {post.content}
              </p>
          
        
              <div className="mt-10">
                <a
                  className="inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)] rounded-lg border border-transparent ring-1 shadow-sm ring-black/10 text-sm font-medium whitespace-nowrap text-gray-950 data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-gray-50"
                  data-headlessui-state=""
                  href="/blog"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                     
                    ></path>
                  </svg>
                  Back to blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}
