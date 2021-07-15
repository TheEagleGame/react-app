import axios from "axios";
import {fetchVideo} from "./actions";

export const loadVideo = () => {
    return async (dispatch, getState) => {
        const queryString = getState().search.queryString
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${queryString}&key=AIzaSyBgb8xgp8ojNVig9IblJ5w0aGQxae6GMA0`)
        const videoIdArray = response.data.items.map (item => {
            return item.id.videoId}
            )
        const secondQueryString = videoIdArray.join('&id=')
        const secondResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${secondQueryString}&key=AIzaSyBgb8xgp8ojNVig9IblJ5w0aGQxae6GMA0`)
        const videoInfo = response.data.items.map( (item,index) => {
            return {
                url: item.snippet.thumbnails.medium.url,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                viewCount: secondResponse.data.items[index].statistics.viewCount
            }
        })
        dispatch(fetchVideo(videoInfo))
    }
}