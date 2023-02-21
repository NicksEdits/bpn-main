import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestAddExercise(props){
    const idWorkout = props.idWorkout
    const muscle = props.valueMuscle
    const exercise = props.valueExercise
    const sets = Number(props.valueSets)
    const reps = props.valueReps
    const weight = Number(props.valueWeight)
    const rank = Number(props.valueRank)
    const rest = Number(props.valueRest)

    
    const reactData = { 
        idWorkout: idWorkout,
        muscle: muscle,
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        rank: rank,
        rest: rest,
    };
    
    console.log(reactData)
    fetch(`/workout/addexercise`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify( reactData )
        }
    )
    .then(response => response.json())
    .then(data => { 
        toast.success("Exercise added !")
        props.setStateExercise(true)
        document.getElementById('closeModalAddExercise').click()
    })
    .catch((error) => {
        console.error('error :', error) 
        toast.error("Exercise not added !")
    })
}


export default RequestAddExercise