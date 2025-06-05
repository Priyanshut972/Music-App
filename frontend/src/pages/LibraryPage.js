import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { 
  Container, 
  Grid, 
  TextField, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress
} from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function LibraryPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [genres] = useState(['Rock', 'Pop', 'Jazz', 'Classical', 'Electronic']);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchTracks = async () => {
      try {
        setLoading(true);
        let url = '/api/music/tracks';
        const params = new URLSearchParams();
        if (searchQuery) params.append('query', searchQuery);
        if (genre) params.append('genre', genre);
        
        if (params.toString()) url += `?${params.toString()}`;
        
        const res = await axios.get(url);
        setTracks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [searchQuery, genre, user, navigate]);

  const handlePlay = (track) => {
    setCurrentTrack(track);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Music Library
      </Typography>
      
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search tracks"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Genre</InputLabel>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              label="Genre"
            >
              <MenuItem value=""><em>All Genres</em></MenuItem>
              {genres.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {tracks.map((track) => (
          <Grid item key={track.externalId} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={track.imageUrl || '/default-music.jpg'}
                alt={track.title}
                sx={{ height: 0, paddingTop: '100%' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h3">
                  {track.title}
                </Typography>
                <Typography color="text.secondary">
                  {track.artist}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handlePlay(track)}
                >
                  Play
                </Button>
                <Button size="small" color="secondary">
                  Add to Playlist
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {currentTrack && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200 }}>
          <AudioPlayer
            autoPlay
            src={currentTrack.audioUrl}
            header={`Now Playing: ${currentTrack.title} - ${currentTrack.artist}`}
            footer={`Duration: ${Math.floor(currentTrack.duration / 60)}:${(currentTrack.duration % 60).toString().padStart(2, '0')}`}
          />
        </Box>
      )}
    </Container>
  );
}

export default LibraryPage;