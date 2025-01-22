import { useEffect, useState } from "react";
import "./Feed.css";
import Share from "../share/share";
import Post from "../post/Post";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/6788fe172b542bbddd0bb6d8");
      setPosts(res.data)
    }
    fetchPosts();
  }, [])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}
