import React from 'react'


function ResetModalAddExercise(){

    const inputMuscle = document.getElementById('input-addexercise-muscle');
    const inputExercise = document.getElementById('input-addexercise-exercise');
    const inputSets = document.getElementById('input-addexercise-sets');
    const inputReps = document.getElementById('input-addexercise-reps');
    const inputWeight = document.getElementById('input-addexercise-weight');
    const inputRest = document.getElementById('input-addexercise-rest');

    // inputMuscle.disabled = inputExercise.disabled = 
    // inputSets.disabled = inputReps.disabled = 
    // inputWeight.disabled = inputRank.disabled = inputRest.disabled = true;

    // Drop red color and border on input
    inputMuscle.classList.remove("border-danger");
    inputMuscle.classList.remove("border-2");
    inputExercise.classList.remove("border-danger");
    inputExercise.classList.remove("border-2");
    inputSets.classList.remove("border-danger");
    inputSets.classList.remove("border-2");
    inputReps.classList.remove("border-danger");
    inputReps.classList.remove("border-2");
    inputWeight.classList.remove("border-danger");
    inputWeight.classList.remove("border-2");
    inputRest.classList.remove("border-danger");
    inputRest.classList.remove("border-2");

}


export default ResetModalAddExercise