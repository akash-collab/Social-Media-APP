import "./Post.css"
import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import {format} from "timeago.js";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  },[post.userId])

  const likehandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture || PF+"person/noAvatar.png"} className="postProfileImg" alt="" />

            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="posttext">{post?.desc}</span>
          <img src={PF + post.img} className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likehandler} />
            <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likehandler} />
            <img src={`${PF}wow.png`} alt="" className="likeIcon" onClick={likehandler} />
            <img src={`${PF}laugh.png`} alt="" className="likeIcon" onClick={likehandler} />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postcommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
