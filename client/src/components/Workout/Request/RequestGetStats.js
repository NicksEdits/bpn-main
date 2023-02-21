

function RequestGetStats(props){
    fetch(`/workout/getstats/${props.idExercise}`)
        .then( response => response.json() )
        .then( data => {
            props.setListStats(data)
        } )
        .catch((error) => { console.error('Error:', error) })
}

export default RequestGetStats