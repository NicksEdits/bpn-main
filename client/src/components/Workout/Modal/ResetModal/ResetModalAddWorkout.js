
function ResetModalAddWorkout(){
    const inputType = document.getElementById('input-addworkout-type');
    const inputName = document.getElementById('input-add-name-workout');

    // Drop red color and border on input
    inputType.classList.remove("border-danger");
    inputType.classList.remove("border-2");
    inputName.classList.remove("border-danger");
    inputName.classList.remove("border-2");
}

export default ResetModalAddWorkout