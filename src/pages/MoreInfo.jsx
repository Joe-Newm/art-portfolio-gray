import { useLocation } from 'react-router-dom';

export default function MoreInfo() {
  const location = useLocation();
  const post = location.state?.post;

  return (
    <div className="container mx-auto flex gap-20 mt-20 mb-20">
      <img src={post.imageURL} alt="painting" className="w-xl" />
      <div>
        <h1>{post.name}</h1>
        <p className="mb-24">{post.description}</p>
        {post.availability === false ?
          <h2>This artwork has been sold.</h2>
        : <h2>Still available — get in touch for details.</h2>}
      </div>
    </div>
  )
}
