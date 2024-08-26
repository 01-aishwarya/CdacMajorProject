import axios from "axios";


export function saveMealAxios(meal)
{
   return  axios.post("https://localhost:7125/api/meal",meal);
}


export function updateMealAxios(meal)
{
   return  axios.put("https://localhost:7125/api/meal",meal);
}


export function deleteMealAxios(id)
{
   return  axios.delete(`https://localhost:7125/api/meal/${id}`);
}



export function getAllMealAxios()
{
   return  axios.get("https://localhost:7125/getmeals");
}


export function getMealByIdAxios(id)
{
   return  axios.get(`https://localhost:7125/api/meal/${id}`);
}


export function GetMealByResIdAxios(id)
{
   return  axios.get(`https://localhost:7125/mealRes/${id}`);
}


export function getMealByMealIdAxios(id)
{
   return  axios.get(`https://localhost:7125/meal/${id}`);
}

export function getResByMealIdAxios(id)
{
   return  axios.get(`https://localhost:7125/res/meal/${id}`);
}

