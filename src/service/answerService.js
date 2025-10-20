import { Get, Post } from "../utils/request";

export const getAnswer = async (patch) =>{
    const data = await Get(patch);
    return data;
}
export const postAnswer = async (patch, data) => {
    const res = await Post(patch, data);
    return res;
}
