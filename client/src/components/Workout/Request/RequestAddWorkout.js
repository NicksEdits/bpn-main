import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestAddWorkout(props){



    const reactData = { 
        userId : props.uid,
        nameWorkout: props.valueName, 
        rankWorkout: props.valueRank, 
        typeWorkout: (props.valueType !== '' ? props.valueType : 'Other')
    };
    fetch('/workout/addworkout',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify( reactData )
        }
    )
    .then(response => response.json())
    .then(data => { 
        toast.success("Workout added !")
        props.setStateWorkout(true)
        document.getElementById('closeModalAddWorkout').click()
    })
    .catch((error) => {
        console.error('error :', error)
        toast.error("Workout not added !")
    })

}

export default RequestAddWorkout