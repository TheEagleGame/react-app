import axios from "axios";
import {fetchVideo} from "./actions";

export const loadVideo = (props) => {
    const {
        queryString,
        queryResultCount,
        querySort
    } = props
    return async (dispatch) => {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${queryResultCount}&q=${queryString}&type=video&order=${querySort}&key=AIzaSyBgb8xgp8ojNVig9IblJ5w0aGQxae6GMA0`)
        const videoIdArray = response.data.items.map (item => {
            return item.id.videoId}
            )
        const secondQueryString = videoIdArray.join(',')
        const secondResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${secondQueryString}&key=AIzaSyBgb8xgp8ojNVig9IblJ5w0aGQxae6GMA0`)
        const videoInfo = response.data.items.map( (item,index) => {
            return {
                url: item.snippet.thumbnails.medium.url,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                viewCount: secondResponse.data.items[index].statistics.viewCount,
                id: item.id.videoId
            }
        })
        dispatch(fetchVideo(videoInfo))
    }
}