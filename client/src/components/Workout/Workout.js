import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import { ToastContainer } from 'react-toastify';

// Modal
import AddWorkoutModal from './Modal/ModalAddWorkout'
import EditWorkoutModal from './Modal/ModalEditWorkout'
import AddExerciseModal from './Modal/ModalAddExercise';
import EditExerciseModal from './Modal/ModalEditExercise';
import DeleteExerciseModal from './Modal/ModalDeleteExercise';
import ModalDeleteConfirmation from './Modal/ModalDeleteConfirmation';

// Request
import RequestGetWorkout from './Request/RequestGetWorkout';

// FormHTML
import FormWorkout from './FormHTML/FormWorkout'

// Resetr Modal
import ResetModalAddWorkout from './Modal/ResetModal/ResetModalAddWorkout';

// Styles css
import '../../styles/Workout.css'

function Workout()
{
    // User
    const uid = useContext(UidContext);

    // Form Edit Workout
    const [nameWorkout, setNameWorkout] = useState(String)
    const [typeWorkout, setTypeWorkout] = useState(String)
    const [rankWorkout, setRankWorkout] = useState()
    // Form Add/Edit Workout
    const [nbWorkout, setNbWorkout] = useState()
    // Form Add/Edit/Delete Workout
    const [stateWorkout, setStateWorkout] = useState(false)
    // Form Add/Edit/Delete Exercise
    const [stateExercise, setStateExercise] = useState(false)

    // FormHTML Workout
    const [listWorkout, setListWorkout] = useState(Array);
    // Form Edit Workout > Form Edit Workout && Add/Edit Exercise, Add/Edit Exercise
    const [idWorkout, setIdWorkout] = useState(String);

    // FormHTML Workout, Form Add/Edit Exercise
    const [nbExercise, setNbExercise] = useState()
    // FormHTML Workout, Form Edit/Delete Exercise
    const [listExercise, setListExercise] = useState(Array);

    // Delete Modal Confirmation
    const [typeDelete, setTypeDelete] = useState()
    const [idDelete, setIdDelete] = useState()


    // Section
    const [listSection, setListSection] = useState(Array);


    useEffect(() => {
        RequestGetWorkout({uid, setListWorkout, setNbWorkout, setListSection, listSection});
        setStateWorkout(false)
    }, [uid, stateWorkout]);
    


    
    return (
    <div className={ uid ? "bg-dark" : ""}>
        <br/>
        <div>
        <br/>
            {/* { uid ? 
                <select class="form-select" id="select-section-allworkout" name="select-section-allworkout"
                >
                    <option value={0} key={0} defaultValue disabled>Choose</option>
                    {
                        console.log(listSection)
                    }
                    {
                        listSection.map((section) => (
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))
                    }
                </select>
                
                : null
            } */}
            {
                uid ? <p className="container text-start ">
                <span className="badge bg-dark border border-light">
                    No. workout{nbWorkout > 1 ? "s" : null }: {nbWorkout}
                </span>
                </p> : null
            }
            {
                uid ? listWorkout.map( (workout) => (
                    <FormWorkout 
                        userId={uid} workout={workout} key={workout._id} 
                        setIdW={setIdWorkout} 
                        setNameW={setNameWorkout} 
                        setRankW={setRankWorkout} 
                        setTypeW={setTypeWorkout}
                        setNbExercise={setNbExercise}
                        setListExercise={setListExercise}
                        setStateWorkout={setStateWorkout}

                        stateExercise={stateExercise}
                        setStateExercise={setStateExercise}

                        setTypeDelete={setTypeDelete}
                        setIdDelete={setIdDelete}
                    />
                )) : (
                    <div className="text-center position-absolute top-50 start-50 translate-middle" >
                        <div className="spinner-border " style={{width: "10rem", height: "10rem"}} role="status">
                        </div>
                        <br/>
                        <span>Loading ...</span>
                    </div>
                )
            }
        </div>
        <br/>
        {
            uid ?
            <button className='container btn' style={{display: 'flex'}}>
                <div
                    className='container card-body border rounded buttonAddWorkout'
                    style={{textAlign: "center"}}
                    data-bs-toggle="modal" 
                    data-bs-target="#modalAddWorkout"
                    disabled aria-label="Close"
                    onClick={ResetModalAddWorkout}
                >
                    Add Workout <span className="bi bi-plus-circle-fill"></span>
                </div> 
            </button>
            : null 
        }
        <br/>
        <AddWorkoutModal 
            uid={uid}
            nbWorkout={nbWorkout}
            setStateWorkout={setStateWorkout}
        />
        <EditWorkoutModal 
            uid={uid}
            idWorkout={idWorkout} 
            nameWorkout={nameWorkout}
            typeWorkout={typeWorkout}
            rankWorkout={rankWorkout}
            nbWorkout={nbWorkout}
            setStateWorkout={setStateWorkout}
        />
        
        <AddExerciseModal 
            idWorkout={idWorkout}
            nbExercise={nbExercise}
            setStateExercise={setStateExercise}
        />
        <EditExerciseModal
            idWorkout={idWorkout}
            listExercise={listExercise}
            nbExercise={nbExercise}
            setStateExercise={setStateExercise}
        />
        <DeleteExerciseModal
            listExercise={listExercise}
            setStateExercise={setStateExercise}
        />
        <ModalDeleteConfirmation 
            typeDelete={typeDelete}
            idDelete={idDelete}
            setStateWorkout={setStateWorkout}
            nameWorkout={nameWorkout}
            rankWorkout={rankWorkout}
        />


        <ToastContainer />
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>)
}

export default Workout