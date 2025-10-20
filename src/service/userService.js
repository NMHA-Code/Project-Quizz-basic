import { Get, Post } from "../utils/request";

export const getUser = async (patch) => {
    const data = await Get(patch);
    return data;
}
export const postUser = async (patch, newdata) =>{
    const data = await Post(patch, newdata);
    return data;
}