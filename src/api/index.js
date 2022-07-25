//统一管理方法
import {login,getUserInfo,editInfo,uploadImage} from "@/api/login";
import {getUserChannel,getNewList} from "@/api/home";

//暴露方法
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const editInfoAPI = editInfo
export const uploadImageAPI = uploadImage
export const getUserChannelAPI = getUserChannel
export const getNewListAPI = getNewList