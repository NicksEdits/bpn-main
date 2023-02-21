import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestDeleteWorkout(id, setStateWorkout){
    fetch(`/workout/deleteworkout/${id}`, {
        method: 'DELETE'
    })
        .then( response => { 
            toast.success("Workout deleted !")
            setStateWorkout(true)
        } )
        .catch((error) => {
            console.error('Error:', error)
            toast.error("Workout not deleted !")
        }) 
}

export default RequestDeleteWorkout