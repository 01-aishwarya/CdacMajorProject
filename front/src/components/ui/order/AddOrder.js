
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveOrderAxios } from '../../../services/orderService/orderCrudAxios';
import axios from "axios";

export const AddOrder=() =>
{




const [order,setOrder] = useState({
    PaymentType:'',Quantity:'',Delivery:'',Customer_Id:'',Meal_Id:''
});

const [token, setToken] = useState(localStorage.getItem("token_customer"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

function changeOrder(e)
{
  //console.log("here");
  setOrder(
        {
          ...order,
         [e.target.name]:e.target.value
     }
     );

}


function handleOrderSubmit(e)
{
 
    e.preventDefault();
 //   console.log(address);
   // console.log("here sub");
    save();
}





async function save()
{
  try{
    const result=await saveOrderAxios(order);
    console.log(result);
    //console.log("here save sub");
  }
  catch(err){
console.log(err);
//console.log("here save kuch sub");
  }
}



    return(
        <>
      
        <Form onSubmit={handleOrderSubmit}>


        <Row className="mb-3" >
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>payment type</Form.Label>
          <Form.Control
            required
            type="text"
            name="PaymentType"
            placeholder="PaymentType"
            onChange={changeOrder}
          />
         
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>quantity</Form.Label>
          <Form.Control
            required
            type="text"
            name="Quantity"
            placeholder="quantity"
            onChange={changeOrder}
          />
         
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>delivery</Form.Label>
          <Form.Control
            required
            type="text"
            name="Delivery"
            placeholder="delivery"
            onChange={changeOrder}
          />
         
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>customer id</Form.Label>
          <Form.Control
            required
            type="text"
            name="Customer_Id"
            placeholder="customer id"
            onChange={changeOrder}
          />
         
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>meal id</Form.Label>
          <Form.Control
            required
            type="text"
            name="Meal_Id"
            placeholder="meal id"
            onChange={changeOrder}
          />
         
        </Form.Group>




      

        </Row>

        <Button type="submit">Place Order</Button>
        </Form>

        </>
    )
}

