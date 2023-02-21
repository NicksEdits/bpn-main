
function RequestGetExercise(props){
    fetch(`/workout/getexercise/${props.idWorkout}`)
        .then( response => response.json() )
        .then( data => {
            props.setListExercise(data)
            props.setNbExercise(data.length)
        } )
        .catch((error) => { console.error('Error:', error) })
}


export default RequestGetExercise