import { useEffect, useState } from "react";

const api_endpoint = "http://localhost:3000/api/v1/posts";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData(api_endpoint);
  }, []);

  function fetchData(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        console.log(posts);
      });
  }

  return (
    <>
      <div className="container my-5">
        <div className="row  row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {posts.map((post) => (
            <div className="col">
              <div className="card h-100">
                <div className="card-img-top">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="card-body">{post.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
