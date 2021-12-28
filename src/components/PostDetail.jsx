import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams, userParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, UrlFor } from "../client";
import { MasonryLayout } from ".";
import { postDetailMorePostQuery, postDetailQuery } from "../utils/data";
import { Spinner } from ".";
import { IoMdHeartEmpty } from "react-icons/io";

const PostDetail = ({ user }) => {
  const [posts, setPosts] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { postId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  const fetchPostDetails = () => {
    let query = postDetailQuery(postId);

    if (query) {
      client.fetch(query).then((data) => {
        setPostDetail(data[0]);

        if (data[0]) {
          query = postDetailMorePostQuery(data[0]);

          client.fetch(query).then((res) => setPosts(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (!postDetail) return <Spinner message="Loading post." />;

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={postDetail?.image && UrlFor(postDetail.image).url()}
            alt="user-post"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${postDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center
                  text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={postDetail.source} target="_blank" rel="noreferrer">
              {postDetail.source.slice(8, 20)}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {postDetail.title}
            </h1>
            <p className="mt-3">{postDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${postDetail.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={postDetail.postedBy?.image}
              alt="user-profile"
            />
            <p className="font-semibold capitalize">
              {postDetail.postedBy?.email.split("@")[0]}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {postDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="comment-user"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold capitalize">
                    {comment.postedBy.email.split("@")[0]}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`user-profile/${postDetail.postedBy?._id}`}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={postDetail.postedBy?.image}
                alt="user-profile"
              />
            </Link>
            <input
              type="text"
              className="flex-1 border-gray-100 outline-none border-2 p-2
            rounded-2xl focus:border-gray-300"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-rose-500 text-white rounded-full px-6 py-2 font-semibold
           text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {posts?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout posts={posts} />
        </>
      ) : (
        <Spinner message="Loading more posts..." />
      )}
    </>
  );
};

export default PostDetail;
