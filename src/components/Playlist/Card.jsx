import { Button, Snackbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {textSlice} from '../../utils/utils'
import { Router, Link as RouterLink} from 'react-router-dom';
import { Item } from '../styled/Item';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useBoolean from '../../hooks/useBoolean';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Sankers from '../shared/Sankers';
import useSnakers from '../../hooks/useSnakers';
import { RefreshOutlined } from '@mui/icons-material';
import { redirect } from "react-router-dom";


const Card = ({item , heading}) => {
  const playlistAction = useStoreActions((action) => action.playlist)
  const favoriteAction = useStoreActions((action) => action.favorite)
  const RecentsAction = useStoreActions((action) => action.recents)
  const favoriteState = useStoreState((state) => state.favorite)

  
  const updateFavorite = (payload) => {
    favoriteAction.setFavorite(payload)
  }
  const deleteItem = (payload) => {
    playlistAction.deletePlaylist(payload)
    favoriteAction.deleteFavorite(payload)
    RecentsAction.deleteRecents(payload)
  }

  const refreashItem = (payload) => {
    playlistAction.deletePlaylist(payload)
    playlistAction.getPlaylistData(payload)
  }

  const redirectPage = (item) => {
    playlistAction.updateVideo({item: item.playlist[0] , index : 0})
    redirect('/playlist/${item.playlistId}')
  }

  return (
    <Item sx={{ height : '380px' , position : 'relative'}} >
        <img src={item.playlistThumbnail?.url} width="100%" height={"200px"} sx={{objectFit : 'content'}}/>
        <Box sx={{ textAlign: 'left' }}>
        <Typography variant='body1' sx={{ lineHeight: '1.5rem', fontWeight: 'bold'}}>{textSlice(item.playlistTitle , 50)}</Typography>

        <Typography variant='body2' sx={{ py:1 }}>By {item.channelTitle}</Typography>
        <br></br>
        <Box sx={{ display : 'flex' , justifyContent : 'space-between' , alignItems : 'center' }}>
          <RouterLink to={`/playlist/${item.playlistId}`}  onClick={() => redirectPage(item)} >
          <Button startIcon={<PlayCircleOutlineIcon />} sx={{ textDecoration : 'none' , position : 'absolute' , bottom : '29px' }}>
          View Playlist
          </Button>
          </RouterLink>
          <Box sx={{}}>
            <Button sx={{ p:'0' , maxWidth: '0px' ,minWidth : '0px' }} onClick={()=>updateFavorite(item.playlistId)}>
              {
                !favoriteState.items.includes(item.playlistId) ? <FavoriteBorderIcon></FavoriteBorderIcon> : <FavoriteIcon sx={{ color : 'red'  }}></FavoriteIcon>
              }
            </Button>

           {
            heading === 'Playlist' &&  <Button sx={{ p : '0' , minWidth : '0px' , marginLeft: '20px' }} onClick={()=>deleteItem(item.playlistId)}>
              <DeleteForeverIcon></DeleteForeverIcon>
            </Button>
           }

            <Button sx={{ p : '0' , minWidth : '0px' , marginLeft: '10px' }} onClick={()=>refreshItem(item.playlistId)}>
              <RefreshOutlined></RefreshOutlined>
            </Button>
          </Box>
        </Box>    
        </Box>
        {
          open == true && <Sankers severity={'success'} message={favoriteState.error}></Sankers>
        }
    </Item>
  )
}

export default Card