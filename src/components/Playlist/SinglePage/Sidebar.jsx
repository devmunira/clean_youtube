import { Box, Button, Typography } from '@mui/material'
import React  from 'react'
import { useParams } from 'react-router-dom';
import { Item } from '../../styled/Item'
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';
import { textSlice } from '../../../utils/utils';
import { useStoreActions, useStoreState } from 'easy-peasy';
import SizesChips from '../../styled/Badge';
import { YTDurationToSeconds } from '../../../utils/timeCovertion';

const Sidebar = ({playlistItem,title,badgeText}) => {

  const {updateVideo,updateWatched} = useStoreActions((action) => action.playlist)

  const playlists = useStoreState((state) => state.playlist);

  const {playerId} = useParams();

  const updateVideoStatus = (payload,index) => {
    console.log(index)
    updateVideo({item : payload , index:index})
    setTimeout(() =>{
      updateWatched({playlerId : playerId , videoId : payload.contentDetails.videoId})
    },1000*60*10)   
  }

  

  return (
      <Box sx={{ maxHeight : '450px' ,overflowY : 'scroll' }}>
        <SizesChips sz={'small'} text={badgeText}></SizesChips>
        <br></br>
          <Typography variant='body1' sx={{ textAlign : 'left', color : '#000'  }}>{title}</Typography>
          <Box sx={{ display : 'flex', justifyContent : 'space-between' , paddingTop : '5px' }}>
          <Typography variant='body2' sx={{ textAlign : 'left' }}>{`Total Videos: ${playlists.data[playerId].playlist.length}`}</Typography>
          <Typography variant='body2' sx={{ textAlign : 'left' }}>{` Watched: ${playlists.getWatched(playerId).length}`}</Typography>
          <Typography variant='body2' sx={{ textAlign : 'left' }}>{` Unwatched: ${playlists.getUnWatched(playerId).length}`}</Typography>
        </Box>
        <br></br>
      {
        playlistItem.map((item , key) => (
          <Item key={key}>
              <Box sx={{ display: 'flex' , alignItems : 'center' , justifyContent:'start' , textAlign : 'left' }}>
                <Typography>{key+1}</Typography>    
                <CardContent>
                  <img src={item.thumbnails?.standard?.url} width={'100px'} height={'70px'} loading={'lazy'}></img>
                </CardContent>

                <Box>
                  <Button type='button' onClick={()=>updateVideoStatus(item,key)} sx={{ textAlign:'left' }}>
                  <Typography title={item.title} variant='body2' sx={{ color : 'black' , cursor : 'pointer' }}>{textSlice(item.title , 60)}</Typography>
                  </Button>
                  <Box sx={{ display: 'flex' , justifyContent : 'space-between' , alignContent : 'center' }}>
                    <Typography variant='body2'>{YTDurationToSeconds(item.duration)}</Typography>
                    <Typography variant='body2'>{`${key+1} / ${playlists.data[playerId].playlist.length}`}</Typography>
                  </Box>
                </Box>
            </Box>
            <Divider></Divider>
          </Item>
        ))
      }
    </Box>
  )
}

export default Sidebar