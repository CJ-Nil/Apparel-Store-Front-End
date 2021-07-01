import React,{useEffect,useState} from 'react'
import {Form,Button,Col,Row} from 'react-bootstrap'
import {LockFill,PersonBadge,GeoAlt, Clock,Calendar2Day, Files} from 'react-bootstrap-icons'
import axios from 'axios'
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
function AddFlight({currentJwt}) {
    console.log(currentJwt)
    const [params,setParams] = useState({
        "p_name":'',
        "b_id":'',
        "c_id":'',
        "m_date":'',
        "price":'',
        "cuntry_origin":'',
        "type":'',
        "style":'',
        "offer":''
    })
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [brands,setBrands] =useState([])
    const [comodity,setComodity] = useState([])
    let i=0;
    useEffect(() =>{
        axios.get('http://localhost:8080/brands')
            .then(response =>{
                setBrandComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
        axios.get('http://localhost:8080/comodity')
            .then(response =>{
                setComodityComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
    },[])
    const handleChange = event => {
        const { value, name } = event.target;
        setParams({ 
          ...params,
          [name]: value 
        })
    }
    function setBrandComponent(data){
       // console.log(data)
        setBrands([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.b_id} value={el.b_id}>{el.b_name}</option>)])
    }
    function setComodityComponent(data){
        //console.log(data)
        setComodity([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.c_id} value={el.c_id}>{el.c_name+" , "+el.sub_name}</option>)])
    }
    function handleFile(event){
        setFile(event.target.files[0])
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(params)
        axios.post('http://localhost:8080/addproduct',params,{
            headers: {
                'Authorization':"Bearer "+currentJwt
            }
        })
            .then(response =>{
                //console.log(response.data) 
                const response_data = response.data
                const lastobject = response_data[response_data.length-1] 
                var blob = file.slice(0, file.size, 'image/png'); 
                var newFile = new File([blob], lastobject.p_code+'.png', {type: 'image/png'});
                const formData = new FormData();
                formData.append("file",newFile);
                axios.put('http://localhost:8080/files',formData)
                .then(response =>{
                    //console.log(response.data)
                    const image_data = response.data;
                    lastobject.image_url=image_data.fileDownloadUri
                    axios.put('http://localhost:8080/updateproduct',lastobject,{
                        headers: {
                            'Authorization':"Bearer "+currentJwt
                        }
                        })
                        .then(response =>{
                            console.log(response.data)
                        })
                        .catch(error =>{
                            console.log(error)
                        })
                })
                .catch(error =>{
                    console.log(error)
                })
            })
            .catch(error =>{
                console.log(error)
            })
    }
    return (
        <Form onSubmit={handleSubmit} className=" bg-info pt-2 pb-2 pl-4 pr-4 ml-2 rounded" style={{height:'650px',overflowY:'scroll'}} >
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'20px'}}
                >Add Product</Form.Label>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    Product Name
                    </Form.Label>
                    <Form.Control 
                    name="p_name"
                    type="text"
                    value={params.p_name}
                    onChange={handleChange}
                    className="form-control-m" required />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                        Select Brand 
                    </Form.Label>
                    <Form.Control value={params.b_id}
                    name="b_id"
                     onChange={handleChange}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Brand</option>
                        {brands}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                     Select Comodity
                    </Form.Label>
                    <Form.Control value={params.c_id}
                    name="c_id"
                     onChange={handleChange}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Comodity</option>
                        {comodity}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                      &#8377; Price
                    </Form.Label>
                    <Form.Control 
                    value={params.price}
                    name="price"
                    onChange={handleChange}
                    type="number" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Calendar2Day size={20}/>Manufacturing Date
                    </Form.Label>
                    <Form.Control 
                    value={params.m_date}
                    name="m_date"
                    onChange={handleChange}
                    type="date" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    Type of Metarial
                    </Form.Label>
                    <Form.Control value={params.type}
                    name="type"
                     onChange={handleChange}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Cloth Material</option>
                        <option value='Cotton'>Cotton</option>
                        <option value='Denim'>Denim</option>
                        <option value='Silk'>Silk</option>
                        <option value='Linen'>Linen</option>
                        <option value='Wool'>Wool</option>
                        <option value='Leather'>Leather</option>
                        <option value='Nylon'>Nylon</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <GeoAlt size={20}/>
                    Cuntry of Origin
                    </Form.Label>
                    <Form.Control 
                    name="cuntry_origin"
                    type="text"
                    value={params.cuntry_origin}
                    onChange={handleChange}
                    className="form-control-m" required>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    Offer in %
                    </Form.Label>
                    <Form.Control 
                    value={params.offer}
                    name="offer"
                    onChange={handleChange}
                    type="number" required  />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    Style Type
                    </Form.Label>
                    <Form.Control value={params.style}
                    name="style"
                     onChange={handleChange}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Style</option>
                        <option value='1'>Men</option>
                        <option value='0'>Women</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    Select Image for Product
                    </Form.Label>
                    <Form.File
                    className="position-relative"
                    required
                    name="file"
                    label="File"
                    onChange={handleFile}
                    feedbackTooltip
                    />
                </Form.Group>
                <Button type="submit" className="px-5" >Save</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
    )
}
const mapStateToProps = createStructuredSelector({
    currentJwt: selectCurrentJwt
  })
export default connect(mapStateToProps)(AddFlight)
