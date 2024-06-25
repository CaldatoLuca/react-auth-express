import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <div className="w-full flex flex-col items-center gap-10 ">
      {posts.length === 0
        ? "No Posts Found"
        : posts.map((p) => (
            <PostCard
              title={p.title}
              image={p.image}
              content={p.content}
              tags={p.tags}
              published={p.published}
              category={p.category.name}
              slug={p.slug}
              user={p.user}
              key={p.id}
            ></PostCard>
          ))}
    </div>
  );
};

export default PostList;
