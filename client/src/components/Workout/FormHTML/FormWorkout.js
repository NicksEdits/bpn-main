import React, { useState, useEffect } from 'react';

// Request
import RequestGetExercise from '../Request/RequestGetExercise';

// Form
import FormExercise from './FormExercise';

// Reset Modal
import ResetModalEditExercise from '../Modal/ResetModal/ResetModalEditExercise';

// Styles css
import '../../../styles/Workout.css'


function FormWorkout(props){
    // props
    const workout = props.workout
    const setStateWorkout = props.setStateWorkout
    const stateExercise = props.stateExercise
    const setStateExercise = props.setStateExercise
    // Form Edit Workout
    const setNameWorkout = props.setNameW
    const setTypeWorkout = props.setTypeW
    const setRankWorkout = props.setRankW

    // Modal Delete Confirmation
    const setTypeDelete = props.setTypeDelete
    const setIdDelete = props.setIdDelete

    // FormHTML Exercise, Form Edit/Delete Exercise
    const [listExercise, setListExercise] = useState(Array);
    // FormHTML Exercise, Form Add/Edit Exercise
    const [nbExercise, setNbExercise] = useState();

    useEffect(() => {
        const idWorkout = workout._id
        RequestGetExercise({idWorkout, setListExercise, setNbExercise})
        setStateExercise(false)
        
    }, [workout._id, stateExercise]);

    // Show or hide collapse with exercises
    function setStateCollapse(element)
    {
        if ( document.getElementById(element) ){
            if ( document.getElementById(element).style.display === "none" )
                document.getElementById(element).style.display = "block";
            else document.getElementById(element).style.display = "none";
        }
    }

    return  (
        <div className="container" key={workout._id}>
        <div className="card-body border border-2 border-warning rounded bg-dark" style={{backgroundColor:"#1a1a1a"}}>
            <div className="position-relative">
                <div className="text-white fs-5">
                    <strong className='fw-light'>
                        #{workout.rankWorkout} {workout.nameWorkout}
                    </strong>
                        <span className="position-absolute end-0">

                            <button className="btn border-light buttonAllWorkout bi bi-info-circle" 
                            type="button"
                            onClick={() => setStateCollapse(`collapseWorkout${workout.rankWorkout}`) }
                            ></button>

                            <span className="container dropdown">
                                <button 
                                    className="btn border-light buttonAllWorkout bi bi-bar-chart" 
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    ></button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a 
                                            className="dropdown-item" 
                                            href={ nbExercise !== 0 ? '/workout/stats/' + workout._id : null}
                                            target="_blank"
                                        >
                                            Look stats <span className='bi bi-bar-chart-fill'></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href={ nbExercise !== 0 ? '/workout/addstats/' + workout._id : null}
                                        >
                                            Add stats <span className='bi bi-plus-circle-fill'></span>
                                        </a>
                                    </li>
                                    <li className='border-top border-dark'>
                                        <button className="dropdown-item text-danger" type="button" 
                                        data-bs-toggle="modal" data-bs-target="#modalDeleteConfirmation"
                                        onClick={() => {
                                            setTypeDelete('stats')
                                            setIdDelete(workout._id)
                                            setNameWorkout(workout.nameWorkout)
                                            setRankWorkout(workout.rankWorkout)
                                        }}
                                        >
                                            Delete All Stats <span className="bi bi-x-circle-fill" />
                                        </button>
                                    </li>
                                </ul>
                            </span>

                            <span className="dropdown ">
                                <button className="btn border-light buttonAllWorkout bi bi-gear" data-bs-toggle="dropdown"
                                aria-expanded="false"></button>
                                <ul className="dropdown-menu ">
                                    <li>
                                        <button className="dropdown-item" type="button" 
                                        data-bs-toggle="modal" data-bs-target="#modalEditWorkout"
                                        onClick={() => {
                                            props.setIdW(workout._id)
                                            setNameWorkout(workout.nameWorkout)
                                            setTypeWorkout(workout.typeWorkout)
                                            setRankWorkout(workout.rankWorkout)
                                        }}
                                        >
                                            Edit Workout <span className="bi bi-pencil-square" />
                                        </button>
                                    </li>
                                    <li className='border-top border-dark'>
                                        <button className="dropdown-item text-danger" type="button"
                                        data-bs-toggle="modal" data-bs-target="#modalDeleteConfirmation"
                                        onClick={() => {
                                            setTypeDelete('workout')
                                            setIdDelete(workout._id)
                                            setNameWorkout(workout.nameWorkout)
                                            setRankWorkout(workout.rankWorkout)
                                        }}
                                        >
                                            Delete Workout <span className="bi bi-x-circle-fill" />
                                        </button>
                                    </li>
                                </ul>
                            </span>
                        </span>
                </div>
            </div>
        </div>
        {
            <div id={"collapseWorkout" + workout.rankWorkout} style={{display:"none"}}>
            <br/>
                <div className="card card-body bg-dark border-warning">
                    <p className='text-white'><strong>Type: </strong><span className='fw-light'>{workout.typeWorkout}</span></p>
                    <p className="text-start ">
                        <span className="badge bg-dark border border-light">
                            No. exercise{nbExercise > 1 ? "s" : null }: {nbExercise}
                        </span>
                    </p>
                    <div>
                            {
                                listExercise.map( (exercise) => (
                                    
                                    <FormExercise
                                        key={exercise._id}
                                        idWorkout={workout._id}
                                        rankWorkout={workout.rankWorkout}
                                        typeWorkout={workout.typeWorkout}
                                        exercise={exercise}
                                    />
                                            
                                ))
                            }
                        <br/>
                        <div className='row'>
                            <button className='col btn'>
                                <div className='container border border-light card-body rounded buttonAddExercise' 
                                    style={{textAlign: "center"}}
                                    data-bs-toggle='modal' data-bs-target='#modalAddExercise'
                                    onClick={() => {
                                        props.setIdW(workout._id)
                                        props.setNbExercise(nbExercise)
                                    }}
                                >
                                    Add Exercise <span className='bi bi-plus-circle-fill'></span>
                                </div>
                            </button>
                            { nbExercise === 0 ? null :
                            <>
                                <button className='col btn'>
                                    <div 
                                        className='container border border-light card-body rounded buttonEditExercise'
                                        style={{textAlign: "center"}}
                                        data-bs-toggle='modal'  data-bs-target='#modalEditExercise'
                                        onClick={() => { 
                                            props.setIdW(workout._id)
                                            props.setListExercise(listExercise)
                                            props.setNbExercise(nbExercise)
                                            ResetModalEditExercise()
                                        }}
                                    >
                                    Edit Exercise <span className='bi bi-gear-fill'></span>
                                    </div>
                                </button>
                                <button className='col btn'>
                                    <div 
                                        className='container border border-light card-body rounded buttonDeleteExercise'
                                        style={{textAlign: "center"}}
                                        data-bs-toggle='modal'  data-bs-target='#modalDeleteExercise'
                                        onClick={() => { 
                                            props.setListExercise(listExercise)
                                        }}
                                    >
                                    Delete Exercise <span className='bi bi-x-circle-fill'></span>
                                    </div>
                                </button>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
        <br/>
    </div>
    )
}

export default FormWorkout
