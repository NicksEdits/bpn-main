

function RequestGetWorkout(props){
    fetch(`/workout/getworkout/${props.uid}`)
            .then( response => response.json() )
            .then( data => {
                props.setListWorkout(data)
                props.setNbWorkout(data.length)
                data.map((workout) => {
                    props.setListSection(listSection => [...listSection, workout.typeWorkout])
                })
                props.setListSection( listSection => Array.from(new Set(listSection)))
            } )
            .catch((error) => { console.error('Error:', error) })
}

export default RequestGetWorkout