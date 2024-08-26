import axios from "axios";


export function saveMenuAxios(menu)
{
   return  axios.post("https://localhost:7125/api/menu",menu);
}


export function updateMenuAxios(menu)
{
   return  axios.put("https://localhost:7125/api/menu",menu);
}


export function deleteMenuAxios(id)
{
   return  axios.delete(`https://localhost:7125/api/menu/${id}`);
}



export function getAllMenuAxios()
{
   return  axios.get("https://localhost:7125/api/menu");
}


export function getMenuByIdAxios(id)
{
   return  axios.get(`https://localhost:7125/api/menu/${id}`);
}

export function getMenuByResIdAxios(id)
{
   return  axios.get(`https://localhost:7125/res/${id}`);
}

