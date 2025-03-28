import { useEffect, useState } from "react";

const api_endpoint = "http://localhost:8000/api/v1/posts";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData(api_endpoint);
  }, []);

  /**
   * Fetches data from the given API endpoint and updates the state with the retrieved posts.
   * @param {string} url - The API endpoint to fetch data from.
   */
  function fetchData(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        console.log(posts);
      });
  }

  /**
   * Deletes a specific post identified by its slug from the API and refreshes the posts list.
   * @param {string} url - The base API endpoint for deletion.
   * @param {string} slug - The unique identifier of the post to delete.
   */
  function deleteData(url, slug) {
    fetch(`${url}/${slug}`, { method: "DELETE" }).then((res) => {
      fetchData(api_endpoint);
    });
  }
  return (
    <>
      <header>
        <h1>
          Poste <strong>Italiane</strong>
        </h1>
      </header>
      <div className="container my-5">
        <div className="row">
          {posts.map((post) => (
            <div key={post.slug} className="col-12">
              <div className="tableContainer d-flex justify-content-between align-items-center p-4">
                <div className="d-flex align-items-center gap-3">
                  <h5>{post.title}</h5>
                  <div className="img_container">
                    <img
                      src={`http://localhost:8000/imgs/posts/${post.image}`}
                      alt=""
                    />
                  </div>
                </div>
                <button
                  onClick={() => deleteData(api_endpoint, post.slug)}
                  className="trashBtn"
                >
                  Elimina 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
