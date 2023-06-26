import React , {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Item} from '../components/styled/Item'
import MainPlayer from '../components/Playlist/SinglePage/MainPlayer';
import Sidebar from '../components/Playlist/SinglePage/Sidebar';
import { Container } from '@mui/system';
import { useStoreActions, useStoreState } from 'easy-peasy';
const Player = () => {
  // Getting All Playlist State from Playlist Store
  const playlists = useStoreState((state) => state.playlist);
  // Getting All Playlist Action from Playlist Store
  const playlistactions = useStoreActions((action) => action.playlist)
  // Getting All Recents Action from Recents Store
  const recentsActions = useStoreActions((action) => action.recents)
  // Getting URl Parameters
  const {playerId} = useParams();
  // This method will add playlist if user enter not added playlist to url
  if(!playlists.data[playerId]){
      playlistactions.getPlaylistData(playerId);
  }
  // This method is responsible for add Visited Playlist to Recents Array
  useEffect(()=>{
      recentsActions.setRecents(playerId)
  },[]);


  useEffect(()=>{
    setTimeout(()=>{
      playlists.video.watched = true
    },5000)
  },[])

  return (
      <Container maxWidth="lg" sx={{ my:5, }}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} >
                <Item>
                  <MainPlayer 
                    item={playlists?.video}
                    playerId={playerId}
                    length= {playlists.data[playerId].playlist.length}
                    channelDeatils={{ channelTilte : playlists?.data[playerId]?.channelTitle }}
                  ></MainPlayer>
                </Item>
              </Grid>
              <Grid item xs={12} md={4}>
                <Item>
                  <Sidebar playlistItem={playlists.getUnWatched(playerId)} title={playlists.data[playerId].playlistTitle} badgeText={'Unwatched'}></Sidebar>
                </Item>
                <br></br>
                <Item>
                  <Sidebar playlistItem={playlists.getWatched(playerId)} title={playlists.data[playerId].playlistTitle} badgeText={'Watched'}></Sidebar>
                </Item>
              </Grid>
            </Grid>
        </Box>
      </Container>
  )
}

export default Player