import { action, persist} from "easy-peasy";
import {toast} from 'react-toastify'


const favoritePlaylistModel = persist({
    items : [],
    error : '',
    loading : false,

    // Set Favorite Item
    setFavorite : action((state,payload) => {
        if(state.items.includes(payload)){
            const index = state.items.indexOf(payload)
            if (index > -1) {
                state.items.splice(index, 1);
                }
        }else{
            if(state.items.length >= 3){
                toast.warn('Maximum space for Favorite is 3, Last one is deleted for adding new one')
                state.items.splice(-1);
            }
            state.items.push(payload)
        }


    }),

    // remove Favorite Item
    deleteFavorite : action((state,payload) => {
        const index = state.items.indexOf(payload)
        if (index > -1) {
            state.items.splice(index, 1);
        }
    })

},{
    storage : 'localStorage'
})

export default favoritePlaylistModel;