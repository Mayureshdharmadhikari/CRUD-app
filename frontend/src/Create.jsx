import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        address: "", // Fixed typo here
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!values.name || !values.address) {
            alert("Please fill in all fields");
            return;
        }

        axios.post('http://localhost:8081/student', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 w-50">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputName" 
                        aria-describedby="nameHelp" 
                        onChange={e => setValues({ ...values, name: e.target.value })} 
                    />
                </div>
                <div className="mb-3 w-50">
                    <label className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputAddress" 
                        onChange={e => setValues({ ...values, address: e.target.value })} 
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default Create;
