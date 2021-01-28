import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import swal from '../../../node_modules/sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 



const ListData = () => { 

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    $(document).ready(function () {
        $('#myTable').DataTable();
    });

    const fetchData = () => {
        setLoading(true);
        axios.get('http://localhost:8000/api/auth/product')
          .then((res) => {
            setData(res.data.products);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    const showAlert = (e)  => {
        e.preventDefault(); // prevent form submit
        let id = e.target.value;
        swal({
            title: "Are you sure?",
            text: "okkkk..",
            icon: "warning",
            buttons: {
                confirm : {text:'ok',className:'sweet-warning'},
                cancel : 'cancel'
            },
        }).then((will)=>{
            if(will){
                {deleteFile(id)}
            }
        });
    }

    const deleteFile = async (event) => {
        const id = event;
        axios.delete(`http://localhost:8000/api/auth/product/${id}`)
        .then((res) => {
            if(res.data.status == 200){
                console.log('Delete success');
                toast.success("Data Delete successfully", { autoClose: 3000 });
            }else{
                toast.error("Data not Delete", { autoClose: 3000 });
            }
        });

        axios.get('http://localhost:8000/api/auth/product')
          .then((response) => {
            setData(response.data.products);
        })
    }

    return (
        <>
            <Fragment>
                {loading ? <img src={`./preloader.gif`} alt="Data Loading"/> : (
                <div>
                    <div className="panel panel-default mt-2">
                        <div className="panel-heading">Product List Data <Link className="btn btn-info mtm-7" to="addProduct"> Add Product </Link></div>
                        <div className="panel-body">
                            <table className="table table-bordered table-stripped" id="myTable">
                                <thead>
                                    <tr>
                                        <th width="5%">SL</th>
                                        <th width="10%">Title</th>
                                        <th width="40%">Description</th>
                                        <th width="10%">Price</th>
                                        <th width="20%">Image</th>
                                        <th width="15%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map((product, index) => (
                                        <tr key={index}>
                                            <td key={index}>{index+1}</td>
                                            <td key={index+1}>{product.title}</td>
                                            <td key={index+2}>{product.description}</td>
                                            <td key={index+3}>{product.price}</td>
                                            <td key={index+4}>
                                                <img height="80px" width="150px" src={`http://localhost:8000/uploads/`+product.image} />
                                            </td>
                                            <td key={index+5}>
                                                <Link className="btn btn-warning" to={`/edit/${product.id}`}> Edit </Link>&nbsp;&nbsp;&nbsp;
                                                <button className="btn btn-danger" onClick={showAlert} value={product.id}>Delete</button>
                                            </td>
                                        </tr>
                                ))}
                            </tbody>
                            </table>
                            <ToastContainer autoClose={3000} closeOnClick />
                        </div>
                    </div>
                </div>
                )}
            </Fragment>
        </>
    )
}

export default ListData