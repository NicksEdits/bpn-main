
// React import
import React from 'react';



// Request
import RequestAddStats from "../Request/RequestAddStats"

function FormAddStats(props){
    // props verif
    const idWorkout = props.idWorkout
    const nbExercise = props.nbExercise
    const stateAddStats = props.stateAddStats
    const setStateAddStats = props.setStateAddStats

    // props sumbit
    const idExercise = props.exercise._id
    const muscle = props.exercise.muscle
    const exercise = props.exercise.exercise
    const sets = props.exercise.sets
    const reps = props.exercise.reps
    const weight = props.exercise.weight
    const rank = props.exercise.rank
    const rest = props.exercise.rest

    function sumbitAddStats(){
        let doneReps = "";
        let doneWeight = "";
        for(let i = 1; i <= sets; i++){
            const inputSets = document.getElementById(`sets-${i}`)
            const inputWeight = document.getElementById(`weight-${i}`)

            if ( inputSets.value === "" ){
                doneReps += String(reps) + ":"
            }
            else if ( inputSets.value !== "" && !isNaN(Number(inputSets.value))  ){
                doneReps += document.getElementById(`sets-${i}`).value + ":"
            }
            else{
                doneReps = ""
                break
            }



            if ( inputWeight.value === "" ){
                doneWeight += String(weight) + ":"
            }
            else if ( inputWeight.value !== "" && !isNaN(Number(inputWeight.value))  ){
                doneWeight += document.getElementById(`weight-${i}`).value + ":"
            }
            else{
                doneWeight = ""
                break
            }
        }

        doneReps = doneReps.slice(0, -1)
        doneWeight = doneWeight.slice(0, -1)


        for(let i = 1; i <= sets; i++){
            const inputSets = document.getElementById(`sets-${i}`)
            const inputWeight = document.getElementById(`weight-${i}`)

            // sets
            if ( inputSets.value === "" ||  ( inputSets.value !== "" && !isNaN(inputSets.value) ) ){
                inputSets.classList.remove("border-danger");
                inputSets.classList.remove("border-2");
                inputSets.classList.add("border-warning");
            }
            else {
                inputSets.classList.remove("border-warning");
                inputSets.classList.add("border-danger");
                inputSets.classList.add("border-2")
                doneReps = ""
            }

            // weight
            if ( inputWeight.value === "" || ( inputWeight.value !== "" && !isNaN(inputWeight.value) ) ){
                inputWeight.classList.remove("border-danger");
                inputWeight.classList.remove("border-2");
                inputWeight.classList.add("border-warning");
            }
            else {
                inputWeight.classList.remove("border-warning");
                inputWeight.classList.add("border-danger");
                inputWeight.classList.add("border-2")
                doneWeight = ""
            }
        }

        if ( doneReps !== "" && doneWeight !== "" ){
            RequestAddStats({
                idWorkout, idExercise, doneWeight, doneReps, 
                stateAddStats, setStateAddStats, nbExercise
            })
            for(let i = 1; i <= sets; i++){
                const inputSets = document.getElementById(`sets-${i}`)
                const inputWeight = document.getElementById(`weight-${i}`)

                inputSets.value = inputWeight.value = ""
                inputSets.classList.remove("border-danger");
                inputSets.classList.remove("border-2");
                inputSets.classList.add("border-warning");
                inputWeight.classList.remove("border-danger");
                inputWeight.classList.remove("border-2");
                inputWeight.classList.add("border-warning");
            }
        }
        
        
    }

    return (
    <form method="POST" action="link">
        <h5 className="card-title text-start">
            <span className='fs-4 fw-bolder'>#{rank} {muscle} - {exercise}</span>
            <p className='fs-6 fw-light'>
                {sets} sets, {reps} reps
                { weight !== 0 ? ", " + weight + "kg" : null}
                { rest !== 0 ? ", " + rest + "min" : null}
            </p>
        </h5>
        <div className="card-text">
                <div className='row'>
                    <div className="col">
                        Reps
                    </div>
                    <div className="col">
                        Weight
                    </div>
                </div>
                {
                    function () {
                        let res = []
                        for(let i = 1; i <= sets; i++){
                            res.push(
                            <div key={i} className='row'>
                                <div className="col">
                                    <input className="border border-warning rounded container" id={"sets-" + i}
                                        placeholder={reps}
                                    />
                                </div>
                                <div className="col">
                                    <input className="border border-warning rounded container" id={"weight-" + i}
                                        placeholder={weight}
                                    />
                                </div>
                            </div>
                            )
                            res.push(<br/>)
                        }
                        return res
                    }()
                }
        </div>
        <br/>
        <button type="button" className="btn btn-success" onClick={sumbitAddStats}>Sumbit</button>
    </form>)
}

export default FormAddStats