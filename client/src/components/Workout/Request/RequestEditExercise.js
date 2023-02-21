import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestEditExercise(props){

    const idExercise = props.idExercise
    const idWorkout = props.idWorkout

    const muscle = props.valueMuscle
    const exercise = props.valueExercise
    const sets = Number(props.valueSets)
    const reps = props.valueReps
    const weight = Number(props.valueWeight)
    const rank = Number(props.valueRank)
    const rest = Number(props.valueRest)
    const oldRank = Number(props.oldRank)
    const checkBoxStats = props.valueCheckBoxStats
    const reactData = { 
        muscle: muscle,
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        rank: rank,
        rest: rest,
    };

    fetch(`/workout/editexercise/${idExercise}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( {
                exercise: reactData, 
                idWorkout: idWorkout, 
                oldRank: oldRank, 
                checkBoxStats: checkBoxStats
            } )
            
        }
    )
        .then(response => response.json())
        .then(data => {
            toast.success("Exercise edited !");
            if (checkBoxStats) toast.success("Stats deleted !");
            props.setStateExercise(true)
            document.getElementById('closeModalEditExercise').click()
        })
        .catch((error) => { 
            console.error('error :', error)
            toast.error("Exercise not edited !")
            if (checkBoxStats) toast.error("Stats not deleted !");

        })  
    //toast.success("after");

}

export default RequestEditExercise