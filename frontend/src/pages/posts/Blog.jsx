import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/slices/postsSlice";
import toast from "react-hot-toast";
import moment from "moment";
import { store } from "../../redux/store";
import Newpost from "../../components/modals/Newpost";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setposts] = useState([]);
  const [creatingNewPost, setCreatingNewPost] = useState(false);
  const dispatch = useDispatch();

  const fetchPosts = () => {
    dispatch(getPosts({}))
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
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0">
            <div className="flex justify-between items-center w-f">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Wellcom to the Blog
              </h2>

              <button
                onClick={() => handelCreatingPost()}
                className=" bg-indigo-800 text-white p-3 rounded-xl"
              >
                Create new Post
              </button>
            </div>

            <p className="mt-2 text-lg/8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.slug} className="relative flex flex-col rounded-3xl bg-white p-2 ring-1 shadow-md shadow-black/5 ring-black/5">
                <img
                  alt="A crossed out European emblem"
                  src={import.meta.env.VITE_API_BASE_URL + "/" + post?.image}
                  className="aspect-3/2 w-full rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col p-8">
                  <div className="text-sm/5 text-gray-700">
                    {moment(post?.createdAt).format("dddd, MMMM D, YYYY")}
                  </div>
                  <div className="mt-2 text-base/7 font-medium">
                    <Link to={"/blog/" + post.slug}> {post.title} </Link>
                  </div>
                  <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                    {post.content}
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      alt=""
                      src={
                        import.meta.env.VITE_API_BASE_URL +
                        "/" +
                        post?.owner?.profile
                      }
                      className="aspect-square size-6 rounded-full object-cover"
                    />
                    <div className="text-sm/5 text-gray-700">
                      {post?.owner?.username}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
