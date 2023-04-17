import React, { useState, useEffect } from 'react';


// useParams is a hook from the react-router-dom library used to extract parameters from the URL

import { useNavigate,useParams } from 'react-router-dom';

import { Button } from '@mui/material';


// Product is a custom type defined to represent the data returned from the API.

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const Details = () => {
  const { id } = useParams(); // useParams hook is used to get the id parameter from the URL.
  const [product, setProduct] = useState<Product | null>(null); // TypeScript type definition. It indicates that the product state variable can hold either a value of type Product  or null
  const navigate = useNavigate();
  

  useEffect(() => {
    const API = "https://fakestoreapi.com/products/" +id; 
    fetch(API)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]); // This ensures that the effect is only run when the id value changes, preventing unnecessary re-renders.

  const handleGoBack = () => {
    navigate('/');
  };
 
  return (
    <div>
      {product && (
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h2>{product.category}</h2>
          <Button variant="contained" onClick={handleGoBack}>Go back to product list</Button>
        </div>
      )}
    </div>
  );
};

export default Details;
