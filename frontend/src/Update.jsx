import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    address: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        console.log('Response:', res);
        if (res.data && res.data.id) { // Ensure res.data contains the expected structure
          setValues({
            name: res.data.name,
            address: res.data.address
          });
        } else {
          console.error('Unexpected response data structure:', res.data);
        }
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8081/update/${id}`, values)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>Update student</h2>
        <div className="mb-3 w-50">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={values.name}
            id="exampleInputName"
            aria-describedby="nameHelp"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputAddress"
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
