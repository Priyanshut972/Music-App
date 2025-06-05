import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const Hero = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  textAlign: 'center',
}));

const ButtonsContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

function HomePage() {
  return (
    <Container maxWidth="md">
      <Hero>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Music Platform
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover, stream, and create playlists from a vast library of songs
        </Typography>
        <ButtonsContainer>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" component={Link} to="/login">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" component={Link} to="/register">
                Register
              </Button>
            </Grid>
          </Grid>
        </ButtonsContainer>
      </Hero>
    </Container>
  );
}

export default HomePage;