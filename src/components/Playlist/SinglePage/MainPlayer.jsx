import React from 'react'
import YouTube from 'react-youtube';
import Accordions from '../../styled/Accordion';
import ImageAvatars from '../../styled/Avatar';
import { Button, Typography } from '@mui/material';
import {Box} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { toast } from 'react-toastify';


const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1,
  }
}

const MainPlayer = ({item,channelDeatils,playerId,length}) => {
  const playlistAction = useStoreActions((action) => action.playlist)
  const playliastState = useStoreState((state) => state.playlist)

  const updatePrev = (item,index) => {
    if(index <= 0 ){
      toast.info('This is the first video')
      return
    }else{
      playlistAction.updateVideo({item: item , index : index - 1})
    }
  }

  const updateNext = (item,index) => {
    console.log(item,index)
    if(index >= length - 1 ){
      toast.info('This is the last video')
      return
    }else{
      playlistAction.updateVideo({item: item , index : index + 1})
    }
  }


  return (
    <div>
      <YouTube videoId={item.contentDetails?.videoId} opts={opts} />
      <Box sx={{ display : 'flex' , justifyContent : 'space-between' , alignItems: 'center' }}>
      <Button  startIcon={<ArrowBackIosNewIcon />} onClick={()=>updatePrev(playliastState.data[playerId].playlist[item.index-1] , item.index)}></Button>
      <Button  endIcon={<ArrowForwardIosIcon />} onClick={()=>updateNext(playliastState.data[playerId].playlist[item.index+1] , item.index)}></Button>
      </Box>
      <h3>{item.title}</h3>
       <h6 sx={{ textAlign : 'left' }}>{new Date(item.contentDetails?.videoPublishedAt).toDateString()}</h6>
      <ImageAvatars text={channelDeatils?.channelTilte} image={channelDeatils?.channelTilte}></ImageAvatars>
      {/* <Accordions items={[{heading:'Description' , description : item?.description}]}></Accordions>     */}
    </div>
  )
}

export default MainPlayer