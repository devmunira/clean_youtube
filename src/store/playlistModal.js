import { action, persist , thunk ,computed} from "easy-peasy";
import { getAllData } from "../api";
import {toast} from 'react-toastify'


const PlaylistModal = persist({
    data : {},
    error : '',
    loading : false,
    video : {},

    updateVideo : action((state,{item,index}) => {
        state.video = {...item , index : index}
    }),

    setError : action((state,payload) => {
        state.error = payload;
    }),

    setLoading : action((state,payload) => {
        state.loading = payload;
    }),

    setStateData : action((state,payload) => {
        state.data[payload.playlistId] = payload;
        state.video = {...payload.playlist[0] , index : 0}
    }),

    updateWatched : action((state,payload) => {
     state.data[payload.playlerId].playlist.map((item) => {
        if(item.contentDetails.videoId == payload.videoId){
            if(!item.watched){
                item.watched = true;
            }
        }
      });
    }),

    getWatched : computed((state) => {
        return (payload) => state.data[payload]?.playlist.filter((item) => item.watched)
    }),

    getUnWatched : computed((state) => {
        return (payload) => state.data[payload]?.playlist.filter((item) => !item.watched)
    }),

    getPlaylistData : thunk (async(actions , payload  , {getState}) => {
        if(payload.startsWith('https://') || payload.startsWith('www') || payload.startsWith('youtube.com')){
            if(payload.includes('list=') && payload.includes('PL')){
                payload = payload.split('list=')[1];
            }else{
               actions.setError('Please Enter a Valid Playlist Link') 
               toast.error('Please Enter a Valid Playlist Link') 
            }
        }else{
            payload = payload;
        }

        if(getState().data[payload]){
            toast.warn('Already Exits')
            return;
        }
        try{
            let playlistData = await getAllData(payload);

            if(Object.keys(getState().data).length >= 6){
               let confirmation = confirm('Max 6 Playlist are allowed,Do you want to delete last item to add new one?');
                if(confirmation){
                    delete getState().data[Object.keys(getState().data)[0]]
                    actions.setError('');
                    actions.setStateData(playlistData)
                }else{
                    actions.setError('Delete less important playlist to add new One')
                    toast.info('Delete less important playlist to add new One')
                }
            }else{
                actions.setError('');
                actions.setStateData(playlistData)
                toast.success('Added Succesfully!')
            }
            }catch (e) {
                actions.setError(e.response?.data?.error?.message || 'Something went wrong');
                toast.error(e.response?.data?.error?.message || 'Something went wrong')
            } finally {
                
            }
       
    }),

    deletePlaylist : action((state , payload) => {
       const Confirmation =  confirm('Are you sure you want to Delete?')
       if(Confirmation == true){
            delete state.data[payload]  
       }else if(Confirmation == false){
            toast.info('your data is safe now')
       }
       return
    })

},{
    storage : 'localStorage'
})

export default PlaylistModal;


