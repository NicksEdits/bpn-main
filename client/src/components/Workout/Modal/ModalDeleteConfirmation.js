import React, { useState, useEffect } from 'react';


import RequestDeleteStats from '../Request/RequestDeleteStats';
import RequestDeleteWorkout from '../Request/RequestDeleteWorkout';



function ModalDeleteConfirmation(props){
    const [typeDelete, setTypeDelete ] = useState(props.typeDelete)
    const [idDelete, setIdDelete ] = useState(props.idDelete)

    const setStateWorkout = props.setStateWorkout
    const nameWorkout = props.nameWorkout
    const rankWorkout = props.rankWorkout


    useEffect(() => {
        setTypeDelete(props.typeDelete)
        setIdDelete(props.idDelete)
    }, [props]);


    function sumbit(){
        if ( typeDelete === "stats" ){
            RequestDeleteStats(idDelete)
            document.getElementById('closeModalDeleteConfirmation').click()

        }
        else if ( typeDelete === "workout" ){
            RequestDeleteWorkout(idDelete, setStateWorkout)
            document.getElementById('closeModalDeleteConfirmation').click()
        }
    }

    return (<div className="modal fade" id="modalDeleteConfirmation">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="h5-formeditexercise-workout-name">
                    Confirmation Delete {typeDelete === "stats" ? `All Stats in` : null} {`#${rankWorkout} ${nameWorkout} workout`}
                </h5>
                <button 
                    id="closeModalDeleteConfirmation"
                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                Are you sure to delete {typeDelete === "stats" ? `all stats in` : null}  {`#${rankWorkout} ${nameWorkout} workout`}?
            </div>
            <div className="modal-footer">
                <button 
                    type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                >
                    Close
                </button>
                <button 
                    type="button" className="btn btn-danger" 
                    onClick={sumbit}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</div>)
}

export default ModalDeleteConfirmation


