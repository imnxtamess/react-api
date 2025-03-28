import { useEffect, useState } from "react";

const api_endpoint = "http://localhost:3000/api/v1/posts";

export default function App() {
  useEffect(() => {
    fetch(api_endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
}
