import React, { useEffect,useState } from 'react'
import { selectCurrentUser,selectUserRole } from '../../redux/user/user.selector.js';
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap'
import {PersonCircle, GeoAltFill, Phone, PersonBadge, PenFill} from "react-bootstrap-icons"
import axios from "axios"
import './Profile.scss'
import CustomerEditModal from "./CustomerEditModal"
function Profile({currentUser,currentJwt,userRole}) {
    const [customer,setCustomer]=useState({})
    const [modalOpen, setModalOpen] = useState(false)
    function closeModal(){
        setModalOpen(false)
    }
    function editHandler(){
        setModalOpen(true);
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/customer/'+currentUser,{
            headers: {
                'Authorization':"Bearer "+currentJwt
            }
        })
        .then(response =>{
            setCustomer(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[currentUser,currentJwt])
    
    return (
        <div className="userprofile">
            {
                customer!=null?<>{dataReprensent(customer,editHandler)}</>:<>{handleOthers(userRole,currentUser,editHandler)}</>
            }
            <Modal show={modalOpen} onHide={closeModal} >
                <CustomerEditModal closeModal={closeModal} customer={customer} setCustomer={setCustomer} />
            </Modal>
        </div>
    )
}

function handleOthers(userRole,currentUser,editHandler){
    return(
        userRole==="ROLE_ADMIN"?<>
            <div className="container p-container">
                <div className="row p-row">
                    <div className="col">
                        WelCome Admin
                    </div>
                </div>
                <div className="row p-row">
                    <div className="col-1">
                        <PersonCircle size={50} />
                    </div>
                    <div className="col-11">
                        {
                            currentUser
                        }
                    </div>
                </div>
                
            </div>
        </>:
        <>
            <div className="container p-container">
                <div className="row p-row">
                    <div className="col">
                       Please Add Your Personal Information for better experience
                    </div>
                </div>
                <div className="pdp-addtocart-button" onClick={editHandler} >
                <div className="btn-gold">
                    <div className="btn-content">
                        <div className="ic-pdp-add-cart">
                            <PenFill  size={20} />
                        </div>
                        <div className="btn-txt">Add Profile</div>
                    </div>
                    
                </div>
            </div>
            </div>
        </>
    )
    
}
function dataReprensent(customer,editHandler){
    return(
        <div className="container p-container">
            <div className="row name p-row">
                <div className="col-1">
                    <PersonCircle size={50} />
                </div>
                <div className="col-11">
                    {
                        customer.name
                    }
                </div>
            </div>
            <div className="row location p-row">
                <div className="col-1">
                    <GeoAltFill size={50} />
                </div>
                <div className="col-11">
                    {
                        customer.address
                    }
                </div>
            </div>
            <div className="row location p-row">
                <div className="col-1">
                    <Phone size={50} />
                </div>
                <div className="col-11">
                    {
                        customer.phone
                    }
                </div>
            </div>
            <div className="row location p-row">
                <div className="col-1">
                    <PersonBadge size={50} />
                </div>
                <div className="col-11">
                    {
                        customer.gender==="M"?"Male":"Female"
                    }
                </div>
            </div>
            <div className="pdp-addtocart-button" onClick={editHandler} >
                <div className="btn-gold">
                    <div className="btn-content">
                        <div className="ic-pdp-add-cart">
                            <PenFill  size={20} />
                        </div>
                        <div className="btn-txt">Edit Profile</div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentJwt: selectCurrentJwt,
    userRole:selectUserRole
  })
export default connect(mapStateToProps) (Profile)
