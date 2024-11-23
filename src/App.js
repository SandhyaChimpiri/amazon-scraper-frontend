import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://amazon-scraper-backend.onrender.com/api.products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Amazon Home Decor Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" width={1000}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td><a href={product.url}><img src={product.image} alt={product.title} width="100" height="150" /></a></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

