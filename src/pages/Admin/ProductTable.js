import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button, Table,Modal} from 'react-bootstrap'
import ProductEditModal from './ProductEditModal'
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
function ProductTable({currentJwt}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [pcode,setPcode] = useState('')
    function closeModal(){
        setModalOpen(false)
    }
    let index = 0;
    const [products,setProducts] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8080/products")
        .then(response =>{
            const data = response.data
            setProducts(data)
            console.log(data);
        })
        .catch(error =>{
            console.log(error)
        })
    },[])
    function editHandler(e){
        setPcode(e.target.id)
        setModalOpen(true);
    }
    function deleteHandler(id){
        axios.delete("http://localhost:8080/deleteproduct/"+id,{
            headers: {
                'Authorization':"Bearer "+currentJwt
            }
        })
        .then(response =>{
            const data = response.data
            setProducts(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <div 
        style={{fontFamily:'sans-serif',fontWeight:'bolder',
        fontSize:'1rem',background:'white',color:'burlywood',
        height:'650px',overflowY:'scroll'}}>
        <Table striped bordered hover responsive="lg" size="sm" className="text-success" >
            <thead>
                <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Comodity</th>
                <th>Price</th>
                <th>Manufacturing date</th>
                <th>Offer %</th>
                <th>Type</th>
                <th>Style</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody >
                {
                    products.length>0?(
                    products.map((el) => {
                        return(<tr key={index}>
                            <td>{index++}</td>
                            <td>{el.p_name}</td>
                            <td>{el.b_id}</td>
                            <td>{el.c_id}</td>
                            <td>&#8377; {el.price}</td>
                            <td>{el.m_date}</td>
                            <td>{el.offer}</td>
                            <td>{el.type}</td>
                            <td>{el.style==='1'?"Male":"Female"}</td>
                            <td><Button id={el.p_code} variant="outline-warning" onClick={editHandler}>Edit</Button></td>
                            <td><Button id={el.p_code} variant="outline-danger" 
                            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(e.target.id) } }
                            >Delete</Button></td>
                        </tr>)
                    })
                    ):
                    null
                }
                
            </tbody>
        </Table>
        <Modal show={modalOpen} onHide={closeModal} >
            <ProductEditModal closeModal={closeModal} id={pcode} setProducts={setProducts} />
        </Modal>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentJwt: selectCurrentJwt
  })
  
export default connect(mapStateToProps)(ProductTable)
