import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.author}</p>
      <p>{post.content.substring(0, 100)}...</p>
      <Link to={`/post/${post._id}`}>Read More</Link>
    </div>
  );
};

export default PostItem;
