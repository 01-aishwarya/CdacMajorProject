import axios from "axios";


export function saveResAxios(res)
{
   return  axios.post("https://localhost:7125/api/res",res);
}



export function updateResAxios(res)
{
   return  axios.put("https://localhost:7125/api/res",res);
}


export function deleteResAxios(id)
{
   return  axios.delete(`https://localhost:7125/api/res/${id}`);
}



export function getAllResAxios()
{
   return  axios.get("https://localhost:7125/getrestaurants");
}

export function getAllResByCityAxios(city)
{
   return  axios.get(`https://localhost:7125/getresbycity/${city}`);
}


export function getResByIdAxios(id)
{
   return  axios.get(`https://localhost:7125/api/res/${id}`);
}