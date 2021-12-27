import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import { MasonryLayout, Spinner } from "./";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new posts to your feed!" />;

  if (!posts?.length)
    return (
      <h2>
        No posts in this category yet!
        <Link
          className="text-emerald-500 font-bold hover:text-emerald-600"
          to="/create-post"
        >
          {" "}
          Why not make one?
        </Link>
      </h2>
    );
  return <div>{posts && <MasonryLayout posts={posts} />}</div>;
};

export default Feed;
