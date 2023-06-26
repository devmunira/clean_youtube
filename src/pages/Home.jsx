import { Container } from '@mui/material';
import * as React from 'react';
import PlaylistContainer from '../components/Playlist/Container';
import { useStoreState } from 'easy-peasy';

const Home = () => {
  const state = useStoreState((state) => state);

  const playlistItem = Object.values(state.playlist.data)

  const recents = state.recents.items

  const favorite = state.favorite.items

  const showAllPaylistData = (ids) => { 
    return ids.map((item) => state.playlist.data[item])
  }

  const favoritePlaylist = showAllPaylistData(favorite);
  
  const recentsPlaylist = showAllPaylistData(recents);

  return (
    <Container>
        <PlaylistContainer playlistItem={recentsPlaylist} heading={'Recents'}></PlaylistContainer>
        <PlaylistContainer playlistItem={favoritePlaylist} heading={'Favorite'}></PlaylistContainer>
        <PlaylistContainer playlistItem={playlistItem} heading={'Playlist'}></PlaylistContainer>
    </Container>
  );
}

export default Home;
