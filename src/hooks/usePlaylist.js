import { useEffect, useState } from "react";
import getPaylistData, { getAllData } from "../api";
import storage from "../utils/localStorage";
import useLoading from "./useLoading";
import {toast} from 'react-toastify'

const INIT = {
    playlistItems : {},
    recentItems : [],
    favoriteItems : []
}
const usePlaylist = () => {
    const [state, setstate] = useState(INIT);

    const [errors, setErrors] = useState('');

    const {setloading} = useLoading();

    useEffect(() => {
		const state = storage.getStorage('youtube__playlist');
		if (state) {
			setstate({ ...state });
		}
	}, []);

	useEffect(() => {
		if (state !== INIT) {
			storage.setStorage('youtube__playlist', state);
		}
	}, [state]);



    const updateStateItems = async (playlistItemId,refresh=false,remove=false) => {
        if(remove){
            delete state.playlistItems[Object.keys(state.playlistItems)[0]]
        }  
        setloading(true)

        try {
			const playlist = await getAllData(playlistItemId);
			setErrors('');
			setstate((prev) => ({
				...prev,
				playlistItems: {
					...prev.playlists,
					[playlistItemId]: playlist,
				},
			}));
		} catch (e) {
			setErrors(e.response?.data?.error?.message || 'Something went wrong');
		} finally {
			setloading(false);
		}
       
    }

    

    const addPaylistItem = async (playlistItemId,refresh=false) => {
        if(playlistItemId.startsWith('https://') || playlistItemId.startsWith('www') || playlistItemId.startsWith('youtube.com')){
            let array = playlistItemId.split('list=');
            if(Array.isArray(array)){
                playlistItemId = array[1]
            }else{
               toast.error('Please Enter a Valid Playlist Link') 
            }
        }else{
            playlistItemId = playlistItemId;
        }  

        if(state.playlistItems[playlistItemId] && !refresh){
            toast.error('Already Exits')
            return;
        }   
        if(Object.keys(state.playlistItems).length >= 2){
            let confirmation = confirm('Max 6 Playlist are allowed,Do you want to delete last item to add new one?')
            if(confirmation){
                await updateStateItems(playlistItemId,refresh , true)
            }else{
                toast.error('At first Delete less important item to add new One')
                return
            }
        }else{
            await updateStateItems(playlistItemId,refresh,false)
        }
       
    }
    
    const addRecentItem = (playlistItemId) => {
        setstate((prev) => ({
            ...prev,
            recentItems : [...prev.recentItems , playlistItemId]
        }))

    }

    const addFavoriteItem = (playlistItemId) => {
        setstate((prev) => ({
            ...prev,
            favoriteItems : [...prev.favoriteItems , playlistItemId]
        }))
    }


    const showAllPaylistData = (ids=[]) => {
        return ids.map((item) => state.playlistItems[ids])
    }

    

    return {
        addPaylistItem,
        showAllPaylistData,
        addFavoriteItem,
        addRecentItem,
        state,
        errors,
        playlists : state.playlistItems
    }

}

export default usePlaylist;