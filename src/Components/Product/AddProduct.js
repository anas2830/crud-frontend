import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from '../../../node_modules/react-images-upload';



const AddProduct = () => { 


    const history = useHistory();
    
    const [data,setData] = useState({title:'',description:'',price:''});
    const [selectFile,setSelectFile] = useState([]);
    const ref = React.createRef();

    const ChangeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    const selectImage = (image) => {
        setSelectFile(image[0]);
    }
    const saveContact = async (e) => {
        e.preventDefault();

        if(selectFile.length == 0){
            toast.error("Please Upload Product Image", { autoClose: 3000 });
        }else{

            const fd = new FormData();
            fd.append('image', selectFile);
            fd.append('title', data.title);
            fd.append('description', data.description);
            fd.append('price', data.price);
            
    
            axios.post('http://localhost:8000/api/auth/product', fd)
              .then((res) => {
                if(res.data.status == 200){
                    console.log('save success');
                    toast.success("Data save successfully", { autoClose: 3000 });
                }else{
                    toast.error("Data not save", { autoClose: 3000 });
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error("Something Wrong", { autoClose: 3000 });
            });
    
            setData({...data,title:'',description:'',price:''});
        }

    }

    const backList = (e) => {
        e.preventDefault();
        history.push('/product');
    }

    return (
        <Fragment>
            <div className="col-md-offset-3 col-md-6">
                <form onSubmit={saveContact} type="multipart/form-data">
                    <div className="form-group">
                        <input type="text" value={data.title} name="title" className="form-control" onChange={ChangeHandler} placeholder="Enter Product Title" required />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" name="description" value={data.description} placeholder="Product Description" onChange={ChangeHandler}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="text" value={data.price} name="price" className="form-control" onChange={ChangeHandler} placeholder="Enter Product Price" required />
                    </div>
                    <div className="form-group">
                        Choose Your Image &nbsp;
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={selectImage}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            name="userImage"
                            withPreview={true}
                            singleImage={true}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Save" /> &nbsp; &nbsp; &nbsp; &nbsp;
                        <button className="btn btn-primary" onClick={backList}>Back To List</button>
                    </div>
                    
                </form>
                <ToastContainer autoClose={3000} closeOnClick />
            </div>
        </Fragment>
    )
}

export default AddProduct