import React, { useState, useEffect } from "react";

import { MasonryLayout, Spinner } from ".";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";

const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());
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
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for posts..." />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Posts Found!</div>
      )}
    </div>
  );
};

export default Search;
