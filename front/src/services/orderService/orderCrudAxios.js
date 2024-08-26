import axios from "axios";


export function saveOrderAxios(order)
{
   return  axios.post("https://localhost:7125/api/order",order);
}


export function updateOrderAxios(order)
{
   return  axios.put("https://localhost:7125/api/order",order);
}


export function deleteOrderAxios(id)
{
   return  axios.delete(`https://localhost:7125/api/order/${id}`);
}

export function deleteOrderByCustAxios(id)
{
   return  axios.delete(`https://localhost:7125/cust/${id}`);
}




export function getAllOrderAxios()
{
   return  axios.get("https://localhost:7125/getorders");
}


export function getOrderByIdAxios(id)
{
   return  axios.get(`https://localhost:7125/api/order/${id}`);
}