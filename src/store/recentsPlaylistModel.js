import { action, persist , thunk ,computed} from "easy-peasy";

const recentPlaylistModel = persist({
    items : [],
    error : '',
    loading : false,


    setRecents : action((state,payload) => {
        if(!state.items.includes(payload)){
            if(state.items.length >= 3){
                state.items.splice(-1);
                state.items.push(payload)
            }else{
                state.items.push(payload)
            }
        }else{
            return false
        }
       
    }),

    //Remove Recents Items
    deleteRecents : action((state,payload) => {
        const index = state.items.indexOf(payload)
        if (index > -1) {
            state.items.splice(index, 1);
        }
    })

},{
    storage : 'localStorage'
})

export default recentPlaylistModel;