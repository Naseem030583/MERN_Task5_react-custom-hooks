import React from 'react';
import useFetch from '../hooks/useFetch';
import './ProductList.css';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

const ProductList = () => {

  const { data: products, loading, error } = useFetch(API_URL);


  if (loading) {
    return (
      <div className="container">
        <h1 className="title">Photos</h1>
        <p className="loading">Loading...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="container">
        <h1 className="title">Photos</h1>
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Photos</h1>
      
      <div className="photos-grid">
        {products.slice(0, 12).map((product) => (
          <div key={product.id} className="photo-item">
            <img 
              src={product.images[0]} 
              alt={product.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
            />
            <p className="photo-title">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
