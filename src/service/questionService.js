import { Get } from "../utils/request";

export const getQuestion = async (patch) =>{
    const data = await Get(patch);
    return data;
}