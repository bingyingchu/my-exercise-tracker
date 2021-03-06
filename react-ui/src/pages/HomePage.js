import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>Exercise Tracker</h2>
            <Table exercises={exercises} onDelete={onDelete} onEdit={onEdit}></Table>
            <footer>Add New Exercise</footer><Link to="/create-exercise"><MdAddCircleOutline/></Link>
        </>
    );
}

export default HomePage;