import axios from "axios";

/**
 * 
 * @param {String} paylistId 
 * @param {Nullable,Boolean} nextpageToken 
 * @param {Array of Data} result 
 * @returns This method will call  api for getting all playlist data from Youtube Data Api
 */

const getPaylistData = async (paylistId,nextpageToken='',result=[]) => {

    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=id,contentDetails,snippet,status&maxResults=50&playlistId=${paylistId}&key=${import.meta.env.VITE_GOOGLE_API_KEY}&pageToken=${nextpageToken}
    `
    try{
        let {data} = await axios.get(URL);
        result = [...result , ...data.items.filter((item) => {
            if(item.snippet.title === 'Deleted video' || item.snippet.title === 'Private video'){
                return false;
            }
            return true;
        })]
        if(data.nextPageToken){
            result = getPaylistData(paylistId,data.nextPageToken,result);
        }
    }catch(e){
       result = [{
        message : e.response?.data?.error?.message || 'Server Error',
        code : e.response?.data?.error?.code || 500,
       }]
    }
    return result;
}

/**
 * 
 * @param {String} playlistId 
 * @returns This method responsible for 2 task, One is getting ChannelId based on playlistId
 * Another task is modify and maintain standernd data Structure 
 */

export const getAllData = async (playlistId) => {
    const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails,id,status,snippet&playlistId=${playlistId}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`

    let {data} = await axios.get(URL);

    let result = await getPaylistData(playlistId)

    const {
        title: playlistTitle,
		description: playlistDescription,
		thumbnails,
		channelId,
		channelTitle,}  = data?.items[0]?.snippet;

    const playlist = result.map(async(item) => {
        // Getting Every Single Video Details
        let videoduration = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Cid&id=${item.contentDetails.videoId}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)

        const {
            title,
			description,
			thumbnails: { standard },}  = item.snippet

        return {
            title,
			description,
			thumbnails: { standard },
            contentDetails: item.contentDetails,
            duration : videoduration.data.items[0].contentDetails.duration,
            watched : false,
        }
    })

    const playlists = await Promise.all(playlist)
    return {
        playlist : playlists,
        playlistDescription,
        playlistId,
        playlistTitle,
        playlistThumbnail: thumbnails.standard,
		channelId,
		channelTitle,
    }
}



export default getPaylistData;