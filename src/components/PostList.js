import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
