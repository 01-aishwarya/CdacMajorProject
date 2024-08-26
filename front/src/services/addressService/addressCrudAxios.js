import axios from "axios";


export function saveAddressAxios(adr)
{
   return  axios.post("https://localhost:7125/api/address",adr);
}

export function updateAddressAxios(adr)
{
   return  axios.put("https://localhost:7125/api/address",adr);
}


export function deleteAddressAxios(id)
{
   return  axios.delete("https://localhost:7125/api/address",id);
}



export function getAllAddressAxios()
{
   return  axios.get("https://localhost:7125/api/address");
}


export function getAddressByIdAxios(id)
{
   return  axios.get("https://localhost:7125/api/address",id);
}

