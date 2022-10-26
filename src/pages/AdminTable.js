import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AdminTable() {

    const [loading, setLoading] = useState(true);
    const [clinics, setClinics] = useState([]);

    useEffect(() => {

        axios.get(`/api/clinics`).then(res=>{
            if(res.status === 200)
            {
                setClinics(res.data.clinics)
                setLoading(false);
            }
        });

    }, []);

    const deleteClinic = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-clinic/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Clinic Data...</h4>
    }
    else
    {
        var clinic_HTMLTABLE = "";
       
        clinic_HTMLTABLE = clinics.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.registration_number}</td>
                    <td>{item.owner_name}</td>
                    <td>{item.clinic_name}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.permit}</td>
                    <td>{item.verified}</td>
                    <td>
                        <Link to={`edit-clinic/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteClinic(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Clinics Data
                                    <Link to={'add-clinics'} className="btn btn-primary btn-sm float-end"> Add Clinic</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Registration #</th>
                                            <th>Owner Name</th>
                                            <th>Clinic Name</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Email</th>
                                            <th>Permit</th>
                                            <th>Verified</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinic_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default AdminTable;