
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAddressAxios } from '../../../services/addressService/addressCrudAxios';


export const AddAddress=() =>
{




const [address,setAddress] = useState({
    Addr:'',City:'',Pincode:''
});


function changeAddress(e)
{
  //console.log("here");
  setAddress(
        {
          ...address,
         [e.target.name]:e.target.value
     }
     );

}


function handleAddressSubmit(e)
{
 
    e.preventDefault();
 //   console.log(address);
   // console.log("here sub");
    save();
}





async function save()
{
  try{
    const result=await saveAddressAxios(address);
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
      
        <Form onSubmit={handleAddressSubmit}>


        <Row className="mb-3" >
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>address </Form.Label>
          <Form.Control
            required
            type="text"
            name="Addr"
            placeholder="address entire"
            onChange={changeAddress}
          />
         
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>city</Form.Label>
          <Form.Control
            required
            type="text"
            name="City"
            placeholder="city"
            onChange={changeAddress}
          />
         
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>pincode</Form.Label>
          <Form.Control
            required
            type="text"
            name="Pincode"
            placeholder="pincode"
            onChange={changeAddress}
          />
         
        </Form.Group>
    

      

        </Row>

        <Button type="submit">Add Address</Button>
        </Form>

        </>
    )
}


