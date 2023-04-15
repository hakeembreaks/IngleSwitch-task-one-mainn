import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const API = "https://fakestoreapi.com/products";
    fetch(API)
      .then((res) => res.json())
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
