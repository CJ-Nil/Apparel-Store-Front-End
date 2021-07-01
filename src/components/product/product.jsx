import React,{useState,useEffect} from 'react'
import { useParams } from "react-router";
import "./product.scss"
import {Bag} from 'react-bootstrap-icons'
import axios from 'axios'
import { connect } from 'react-redux';
import { addItem }from '../../redux/cart/cart.actions.js';
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import { createStructuredSelector } from 'reselect';
import { useHistory } from "react-router-dom";
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
function Product({addItem,currentUser,currentJwt}) {
    let { id } = useParams();
    const [data,setData] = useState({})
    const history = useHistory();
    const [brand,setBrand] = useState(" ")
    
    useEffect(()=>{
        if(id!==undefined){
            axios.get('http://localhost:8080/product/'+id)
                .then(response =>{
                    const d = response.data
                    setData(d)
                    axios.get('http://localhost:8080/brand/'+d.b_id)
                    .then(response=>{
                        setBrand(response.data)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                    console.log("data ",d)
                    if(currentUser!=null){
                        var date = new Date();
                        const params={
                            "username":currentUser,
                            "c_id":d.c_id,
                            "offer":d.offer,
                            "date":date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
                        }
                        axios.put("http://localhost:8080/addhistory",params,{
                            headers: {
                                'Authorization':"Bearer "+currentJwt
                            }
                        })
                        .then(response=>{
                            console.log(response.data)
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                    }
                    
                })
                .catch(error =>{
                    console.log(error)
                })
            
            
        }
    },[id])
    function addItemHandler(){
        if(currentUser !== null)
        addItem(data)
        else{
          history.push("/signin")
          console.log("Please sign in first !")
        } 
    }
    return (
        <div className="productpage">
            {
                data!=null?(
                    <>
                        <div className="container">
                            <div className="row">
                                <div className="col-7">
                                    <div className="image">
                                        <img className="imagetag" src={data.image_url} alt={data.p_name}></img>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="content">
                                        <h2 className="b-name">{brand.b_name}</h2>
                                        <h1 className="p-name">{data.p_name}</h1>
                                        <div className="prod-price-section ">
                                            <div className="prod-sp">Rs. {Math.floor(data.price-data.price*(data.offer/100))}</div>
                                            <div className="prod-price-sec">
                                                <span className="prod-cp">Rs. {data.price}</span>
                                                <span className="prod-discnt">&nbsp;({data.offer} off)</span>
                                            </div>
                                        </div>
                                        <div className="prod-gst">Price inclusive of all taxes</div>
                                        <div className="pdp-addtocart-button" onClick={addItemHandler}>
                                            <div className="btn-gold">
                                                <div className="btn-content">
                                                    <div className="ic-pdp-add-cart">
                                                        <Bag  size={20} />
                                                    </div>
                                                    <div className="btn-txt">ADD TO BAG</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="details">

                        </div>
                    </>
                ):<h2>Invalid Request!</h2>
            }
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentJwt: selectCurrentJwt
})
export default connect(mapStateToProps, mapDispatchToProps)(Product)
