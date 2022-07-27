//统一管理方法
import {login,getUserInfo,editInfo,uploadImage} from "@/api/login";
import {getUserChannel,getNewList,getArticle,followAuth} from "@/api/home";
import {getComments,setComment} from "@/api/comment";
import {getAllChannel,addChanel,delChannel} from "@/api/channel";

//暴露方法
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const editInfoAPI = editInfo
export const uploadImageAPI = uploadImage
export const getUserChannelAPI = getUserChannel
export const getNewListAPI = getNewList
export const getArticleAPI = getArticle
export const followAuthAPI = followAuth
export const getCommentsAPI = getComments
export const setCommentAPI = setComment
export const getAllChannelAPI = getAllChannel
export const addChanelAPI = addChanel
export const delChannelAPI = delChannel