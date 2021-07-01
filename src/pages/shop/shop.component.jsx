import React,{useState,useEffect} from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import { useParams } from "react-router";
import axios from 'axios'
function ShopPage()
{
    let { id } = useParams();
    const [data,setData] = useState({
        "id":1,
        "title":"All products",
        "routeName":"/shop",
        "items":[]
    })
    useEffect(()=>{
        if(id === undefined){
            axios.get('http://localhost:8080/products')
                .then(response =>{
                    const d = response.data
                    console.log("d",d)
                    setData({
                        "id":1,
                        "title":"All products",
                        "routeName":"/shop",
                        "items":d
                    })
                    console.log("data 2",data)
                })
                .catch(error =>{
                    console.log(error)
                })
        }
        else{
            if(id==="new"){
                axios.get('http://localhost:8080/newproducts')
                .then(response =>{
                    const d = response.data
                    setData({
                        "id":1,
                        "title":"NEW ARRIVALS",
                        "routeName":"/shop/"+id,
                        "items":d
                    })
                    console.log("data 3",data)
                })
                .catch(error =>{
                    console.log(error)
                })
            }
            else{
                axios.get('http://localhost:8080/products/'+id)
                .then(response =>{
                    const d = response.data
                    setData({
                        "id":1,
                        "title":id,
                        "routeName":"/shop/"+id,
                        "items":d
                    })
                    console.log("data 3",data)
                })
                .catch(error =>{
                    console.log(error)
                })
            }
        }
    },[])
        
    console.log("data 1",data)
    return (
    <div className='shop-page'>
        <CollectionsOverview collection ={data} />
    </div>
    );
}

export default ShopPage;