import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress 
} from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function PlayerPage() {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/music/tracks/${id}`);
        setTrack(res.data);
      } catch (err) {
        setError('Failed to load track');
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !track) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error || 'Track not found'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          {track.title}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {track.artist}
        </Typography>
        {track.album && (
          <Typography variant="subtitle1" gutterBottom>
            Album: {track.album}
          </Typography>
        )}
        {track.genre && (
          <Typography variant="subtitle1" gutterBottom>
            Genre: {track.genre}
          </Typography>
        )}
        
        <Box my={4}>
          <AudioPlayer
            autoPlay
            src={track.audioUrl}
            header={`Now Playing: ${track.title}`}
            footer={`Duration: ${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}`}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default PlayerPage;