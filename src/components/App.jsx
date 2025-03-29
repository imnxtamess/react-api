import { useEffect, useState } from "react";

const api_endpoint = "http://localhost:8000/api/v1/posts";
export default function App() {
  const [posts, setPosts] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    image: "",
    content: "",
  });
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
        setPosts(data);
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
    fetch(`${url}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleEditClick(slug) {
    console.log("Clicked Edit of" + slug);
    const postToEdit = posts.find((post) => post.slug === slug);
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        tags: postToEdit.tags,
        image: postToEdit.image,
        content: postToEdit.content,
      });
    }
    setCurrentSlug(slug);
    setIsForm(true);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("edit submit for", currentSlug);
    editData(api_endpoint, currentSlug).then(() => {
      setIsForm(false);
      fetchData(api_endpoint);
    });
  }

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            {posts.map((post, index) => (
              <tr key={post.slug + index}>
                <th scope="row">{post.slug}</th>
                <td>{post.title}</td>
                <td>
                  <img
                    src={`http://localhost:8000/imgs/posts/${post.image}`}
                    alt={post.title}
                  />
                </td>
                <td className="text-start">
                  <button
                    onClick={() => handleEditClick(post.slug)}
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

        <form
          onSubmit={handleFormSubmit}
          className={
            isForm
              ? "text-center py-5 row flex-column justify-content-center"
              : "d-none"
          }
        >
          <h1>Edit Post</h1>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Title
            </span>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              className="form-control"
              placeholder="Write the post title here..."
              aria-label="title"
              aria-describedby="basic-addon1"
              name="title"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="tagsHelper">
              Tags
            </span>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              className="form-control"
              placeholder="Write the post tags here..."
              aria-label="tags"
              aria-describedby="tagsHelper"
              name="tags"
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="imageHelper">
              Image
            </span>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              className="form-control"
              placeholder="Write the image url here.. "
              aria-label="image"
              aria-describedby="imageHelper"
              name="image"
            ></input>
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text" id="contentHelper">
              Content
            </span>
            <textarea
              onChange={(e) => handleInputChange(e)}
              className="form-control"
              placeholder="Write the post content here..."
              aria-label="content"
              aria-describedby="contentHelper"
              name="content"
            ></textarea>
          </div>
          <button type="submit" className="form-control w-50 align-self-center">
            Submit Edits
          </button>
        </form>
      </div>
    </>
  );
}
