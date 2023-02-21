import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestDeleteStats(idWorkout){

    fetch(`/workout/deletestats/${idWorkout}`, {
        method: 'DELETE'
    })
        .then( () => {
            toast.success("All workout stats deleted !")
        })
        .catch( () => { 
            toast.error("All workout stats not deleted !")
        }) 
}

export default RequestDeleteStats