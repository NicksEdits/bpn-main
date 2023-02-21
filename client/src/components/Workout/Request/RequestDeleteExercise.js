import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestDeleteExercise(props){
    const idExercise = props.idExercise

    fetch(`/workout/deleteexercise/${idExercise}`, {
        method: 'DELETE'
    })
        .then( response => { 
            toast.success("Exercise deleted !")
            props.setStateExercise(true)
            document.getElementById('closeModalDeleteExercise').click()
        } )
        .catch((error) => {
            console.error('Error:', error)
            toast.error("Exercise not deleted !")
        });
}

export default RequestDeleteExercise