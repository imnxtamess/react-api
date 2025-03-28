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

  function editData(url, slug) {
    console.log("You clicked me");
  }

  return (
    <>
      <header>
        <h1>
          Posts<strong>Blog</strong>
        </h1>
      </header>
      <div className="container my-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#slug</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <th scope="row">{post.slug}</th>
                <td>{post.title}</td>
                <td>
                  <img
                    src={`http://localhost:8000/imgs/posts/${post.image}`}
                    alt=""
                  />
                </td>
                <td className="text-start">
                  <button
                    onClick={() => editData(api_endpoint, post.slug)}
                    className="Btn"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteData(api_endpoint, post.slug)}
                    className="Btn"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
