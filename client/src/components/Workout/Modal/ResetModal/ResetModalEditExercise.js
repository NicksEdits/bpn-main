


function ResetModalEditExercise(){
    const inputRank = document.getElementById('input-editexercise-rank');
    const inputMuscle = document.getElementById('input-editexercise-muscle');
    const inputExercise = document.getElementById('input-editexercise-exercise');
    const inputSets = document.getElementById('input-editexercise-sets');
    const inputReps = document.getElementById('input-editexercise-reps');
    const inputWeight = document.getElementById('input-editexercise-weight');
    const inputRest = document.getElementById('input-editexercise-rest');
    const checkboxDS = document.getElementById('checkbox-editexercise-delete-stats');
    const selectExercise = document.getElementById('select-editexercise-choose')

    inputMuscle.disabled = inputExercise.disabled = 
    inputSets.disabled = inputReps.disabled = 
    inputWeight.disabled = inputRank.disabled = inputRest.disabled =
    checkboxDS.disabled = true;

    checkboxDS.checked = false;

    // Drop red color and border on input
    inputRank.classList.remove("border-danger");
    inputRank.classList.remove("border-2");
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

    selectExercise.value = 0;
}

export default ResetModalEditExercise