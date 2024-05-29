import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Read = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log('Response:', res);
                if (res.data && res.data.id) { // Ensure res.data contains the expected structure
                    setStudent(res.data);
                } else if (res.data && res.data.message) {
                    setError(res.data.message);
                } else {
                    setError('No student found with this ID');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                setError('An error occurred while fetching the student data');
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='p-2'>
                <h2>Student Details</h2>
                <h2>id: {student.id}</h2>
                <h2>Name: {student.name}</h2>
                <h2>Address: {student.address}</h2>
                </div>
                
                <Link to='/' className='btn btn-primary me-2'>Back</Link>
                <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link>
            </div>
        </div>
    );
};

export default Read;
