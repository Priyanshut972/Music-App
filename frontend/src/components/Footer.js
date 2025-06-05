import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton 
} from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Music Platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover, stream, and create playlists from a vast library of songs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="/" color="inherit" underline="hover" mb={1}>
                Home
              </Link>
              <Link href="/library" color="inherit" underline="hover" mb={1}>
                Library
              </Link>
              <Link href="/login" color="inherit" underline="hover" mb={1}>
                Login
              </Link>
              <Link href="/register" color="inherit" underline="hover">
                Register
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" mt={2}>
              © {new Date().getFullYear()} Music Platform
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;