import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from '../../../node_modules/react-images-upload';



const EditProduct = (props) => { 


    const history = useHistory();
    const id = props.match.params.id;
    
    const [data,setData] = useState({title:'',description:'',price:''});
    const [selectFile,setSelectFile] = useState([]);
    const[isSelectFile, setIsSelectedFile] = useState([]);  // when get selected item

    const ref = React.createRef();
    const [changeImage, setChangeImage] = useState(0);

    const ChangeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    const selectImage = (image) => {
        setChangeImage(1);
        setSelectFile(image[0]);
    }

    const fetchData = () => {
        axios.get(`http://localhost:8000/api/auth/product/${id}/edit`)
          .then((res) => {
            console.log('retrive data',res.data);
            setData({
                title: res.data.product.title,
                description: res.data.product.description,
                price: res.data.product.price,
            });

            setIsSelectedFile('http://localhost:8000/uploads/'+res.data.product.image);

            setSelectFile(res.data.product.image);

          })
          .catch((error) => {
            console.log(error);
        });
    };

    const updateContact = async (e) => {
        e.preventDefault();
        if(selectFile){ 

            let fData = new FormData();
            fData.append('image', selectFile);
            fData.append('title', data.title);
            fData.append('description', data.description);
            fData.append('price', data.price);
            
    
            axios.post(`http://localhost:8000/api/auth/product/${id}?_method=PATCH`, fData)
              .then((res) => {
                if(res.data.status == 200){
                    console.log('update successfully');
                    toast.success("Data update successfully", { autoClose: 3000 });
                }else{
                    toast.error("Data not update", { autoClose: 3000 });
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error("Something Wrong", { autoClose: 3000 });
            });

        }else{
            toast.error("Please Upload Product Image", { autoClose: 3000 });
        }
    }

    const backList = (e) => {
        e.preventDefault();
        history.push('/product');
    }

    return (
        <Fragment>
            <div className="col-md-offset-3 col-md-6">
                <form onSubmit={updateContact} type="multipart/form-data">
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
                        {changeImage == 0 ?
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={selectImage}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            name="userImage"
                            withPreview={true}
                            singleImage={true}
                            defaultImages={[isSelectFile]}
                        />: 
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
                        }
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Update" /> &nbsp; &nbsp; &nbsp; &nbsp;
                        <button className="btn btn-primary" onClick={backList}>Back To List</button>
                    </div>
                    
                </form>
                <ToastContainer autoClose={3000} closeOnClick />
            </div>
        </Fragment>
    )
}

export default EditProduct;