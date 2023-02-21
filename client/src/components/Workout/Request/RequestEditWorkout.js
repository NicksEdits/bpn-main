import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestEditWorkout(props){
    const userId = props.uid
    const idWorkout = props.idWorkout;
    const inputName = props.valueName;
    const inputRank = Number(props.valueRank);
    const inputType = props.valueType;
    const oldRank = props.oldRank
    
    const reactData = { 
        nameWorkout: inputName, 
        rankWorkout: inputRank, 
        typeWorkout: inputType,
    };

    fetch(`/workout/editworkout/${idWorkout}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify( {workout: reactData, userId: userId, oldRank: oldRank} )
        }
    )
    .then(response => response.json())
    .then(data => { 
        toast.success("Workout edited !")
        props.setStateWorkout(true)
        document.getElementById('closeModalEditWorkout').click()

    })
    .catch((error) => {
        console.error('error :', error)
        toast.error("Workout not edited !")
    })
}

export default RequestEditWorkout