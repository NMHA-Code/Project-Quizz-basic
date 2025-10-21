// const API_DOMAIN = 'http://localhost:3002/';
const API_DOMAIN = 'https://databasequizz.vercel.app/';

// Get
export const Get = async (patch) => {
    const res = await fetch(API_DOMAIN + patch);
    const data = await res.json();
    return data;
}
// Post
export const Post = async (patch, newdata) =>{
    const res = await fetch(API_DOMAIN + patch, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newdata)
    })
    const data = await res.json();
    return data;
}
// Delete 
export const Delete = async (patch, dataid) =>{
    const res = await fetch(`${API_DOMAIN}${patch}/${dataid}`, {
        method: 'DELETE',
    })
    const data = await res.json();
    return data;
}
//Edit
export const Edit = async (patch, dataid, newdata) =>{
    const res = await fetch(`${API_DOMAIN}${patch}/${dataid}`,{
        method: 'PATCH',
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newdata)
    })
    const data = await res.json();
    return data;
}
