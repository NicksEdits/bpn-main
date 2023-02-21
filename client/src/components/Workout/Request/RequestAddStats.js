import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestAddStats(props){
    const reactData = { 
        idWorkout: props.idWorkout,
        idExercise: props.idExercise,
        weight: props.doneWeight,
        reps: props.doneReps
    };

    fetch(`/workout/addstats`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( reactData )
        }
    )
        .then(response => response.json())
        .then(() => {
            toast.success("Stats added !")
            if ( props.nbExercise > props.stateAddStats+1 )
                props.setStateAddStats(props.stateAddStats+1)
            else
                window.location = '/workout'
        })
        .catch((error) => {
            console.error('error :', error)
            toast.error("Stats not added !")
        })  
}

export default RequestAddStats