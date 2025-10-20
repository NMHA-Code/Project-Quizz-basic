import { Get } from "../utils/request";

export const getTopic = async (patch) => {
    const data = await Get(patch);
    return data;
}