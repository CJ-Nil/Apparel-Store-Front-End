import React,{useEffect,useState} from 'react'
import {Form, Modal,Button} from 'react-bootstrap'
import {GeoAlt, PersonCircle, Phone,} from 'react-bootstrap-icons'
import axios from 'axios'
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
function CustomerEditModal({closeModal,customer,setCustomer,currentUser,currentJwt}) {
    
    const [params,setParams] = useState({
        "username":'',
        "name":'',
        "address":'',
        "phone":'',
        "gender":''
    })
    useEffect(()=>{
        if(customer!=null){
            setParams(customer)
        }
        else{
            setParams({...params,"username":currentUser})
        }
    },[customer])
    const handleChange = event => {
        const { value, name } = event.target;
        setParams({ 
          ...params,
          [name]: value 
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        axios.put('http://localhost:8080/updatecustomer',params,{
            headers: {
                'Authorization':"Bearer "+currentJwt
            }
        })
            .then(response =>{
                setCustomer(response.data)  
                console.log("After Update ",response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        closeModal()
    }
    return (
        <>
            <Modal.Header className='bg-info' closeButton>Edit Profile Details</Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} className="w-100 bg-info pt-2 pb-2 pl-4 pr-4 rounded">
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'20px'}}
                >Edit Profile Details</Form.Label>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <PersonCircle size={20}/>
                        Name
                    </Form.Label>
                    <Form.Control 
                    name="name"
                    type="text"
                    value={params.name}
                    onChange={handleChange}
                    className="form-control-m" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <GeoAlt size={20}/>
                    Address
                    </Form.Label>
                    <Form.Control 
                    name="address"
                    type="text"
                    value={params.address}
                    onChange={handleChange}
                    className="form-control-m" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Phone size={20}/>
                    Phone
                    </Form.Label>
                    <Form.Control 
                    name="phone"
                    type="text"
                    value={params.phone}
                    onChange={handleChange}
                    className="form-control-m"  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    Gender
                    </Form.Label>
                    <Form.Control value={params.gender}
                    name="gender"
                     onChange={handleChange}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Your gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Fimale</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="px-5" >Save</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
            </Modal.Body>
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentJwt: selectCurrentJwt
  })
export default connect(mapStateToProps)(CustomerEditModal)
