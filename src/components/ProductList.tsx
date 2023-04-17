import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';


// define an interface Product with the properties of the products we want to render.
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

function ProductList() {
  const [products, setProducts] = useState([]);  // useState is used to initialize two state variables: products and isPending
  const [isPending, setIsPending] = useState(true);

  //useEffect is used to fetch the data from the API and update the state variables products and isPending. The useEffect hook runs only once when the component mounts because an empty array is passed as the second argument.
  useEffect(() => {
    const API = "https://fakestoreapi.com/products";
    fetch(API)
      .then((res) => res.json()) // / line converts response to JSON format and the following line .then data, handles the json data
      .then(data => {
        console.log(data);
        setProducts(data);
        setIsPending(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Grid container spacing={1}>
      {isPending && <div>Loading....</div>}
      {products && products.length > 0 ? (
        products.map((item: Product, index: number) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
                <Card  sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px',
            maxWidth: '300px',
            height: '410px',
            }}
            >
           <NavLink to={{ pathname: `/products/${item.id}` }}>
        <CardMedia
          sx={{
            width: '150px',
            objectFit: 'contain',
            height: '150px',
            cursor: 'pointer',
          }}
          component="img"
          image={item.image}
          alt={item.title}
        />
      </NavLink>

              <CardContent>
                <Typography  sx={{ margin: '10px 0', textAlign: 'center' }}
          variant="h6">{item.title}</Typography>

                <Typography  sx={{ margin: '10px 0', textAlign: 'center' }}
          variant="subtitle1"
          color="textSecondary">${item.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default ProductList;


// The condition is that "products" should exist and its length should be greater than 0. 
// If this condition is true, then the list of products is rendered using the "map" method, 
// which loops through each item in the "products" array and creates a new element for it based
// on the JSX code provided.

// The "map" method takes two arguments: the first is the current item being iterated over
// (in this case, called "item"), and the second is the index of that item in the array (called "index"). 
