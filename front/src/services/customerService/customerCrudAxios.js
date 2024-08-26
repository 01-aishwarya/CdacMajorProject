import axios from "axios";


export function saveCustomerAxios(cust)
{
   return  axios.post("https://localhost:7125/api/customer",cust);
}


export function updateCustomerAxios(cust)
{
   return  axios.put("https://localhost:7125/api/customer",cust);
}


export function deleteCustomerAxios(id)
{
   return  axios.delete(`https://localhost:7125/api/customer/${id}`);
}



export function getAllCustomerAxios()
{
   return  axios.get("https://localhost:7125/getcustomers");
}


export function getCustomerByIdAxios(id)
{
   return  axios.get(`https://localhost:7125/api/customer/${id}`);
}

