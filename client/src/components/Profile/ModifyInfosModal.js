import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModifyInfosModal( props )
{
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(Number);
    const [sex, setSex] = useState('');
    const [weight, setWeight] = useState(Number);
    const [height, setHeight] = useState(Number);
    const [goal, setGoal] = useState('');

    //Update Form
    useEffect(() => {
        setFirstname(props.firstname);
        setName(props.name);
        setAge(props.age);
        setSex(props.sex);
        setWeight(props.weight);
        setHeight(props.height);
        setGoal(props.goal);       
    }, [props.firstname, props.name, props.age, props.sex, props.weight, props.height, props.goal]);

    // Update backend
    function registerInfos()
    {
        // Check form errors
        if(isNaN(age) || isNaN(height) || isNaN(weight))
        {
            if(isNaN(age))
            {
                document.getElementById('inputAge').classList.add('border-danger');
                toast.error('Age must be a Number');
                setAge('');
            }
            else document.getElementById('inputAge').classList.remove('border-danger');

            if(isNaN(height))
            {
                document.getElementById('inputHeight').classList.add('border-danger');
                toast.error('Height must be a Number');
                setHeight('');
            }
            else document.getElementById('inputHeight').classList.remove('border-danger');

            if(isNaN(weight))
            {
                document.getElementById('inputWeight').classList.add('border-danger');
                toast.error('Weight must be a Number');
                setWeight('');
            }
            else document.getElementById('inputWeight').classList.remove('border-danger');
        }
        else 
        {
            // Clear modal
            document.getElementById('inputAge').classList.remove('border-danger');
            document.getElementById('inputHeight').classList.remove('border-danger');
            document.getElementById('inputWeight').classList.remove('border-danger');

            // If empty string in form, push 'Not Specified' on DataBase
            const fnToback = firstname === '' ? 'Not Specified' : firstname;
            const nameToback = name === '' ? 'Not Specified' : name;
            const ageToback = age === '' ? 0 : age;    
            const heightToback = height === '' ? 0 : height;
            const weightToback = weight === '' ? 0 : weight;
            const goalToback = goal === '' ? 'Not Specified' : goal;

            const newdata = {
                firstname: fnToback,
                name: nameToback,
                age: ageToback,
                sex: sex,
                height: heightToback,
                weight: weightToback,
                goal: goalToback,
                
            }
            fetch(`/user/profile/${props.uid}`,
                {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newdata)
                }
            )
            .then(handleChanges());
        }
    }

    // Update changes
    function handleChanges(){
        
        props.setFirstname(firstname);
        props.setName(name);
        props.setAge(age);
        props.setSex(sex);
        props.setHeight(height);
        props.setWeight(weight);
        props.setGoal(goal);
        document.getElementById('CloseModifyInfosModal').click();

        // Success Notification
        toast.success("Informations Updated !");
    }


    return <>
            <div className="modal fade" id="ModifyInfosModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Informations</h5>
                            <button id='CloseModifyInfosModal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                firstname === 'Not Specified' ? 
                                <div className="mb-3">
                                    <label className="form-label">First name</label>
                                    <input type="text" className="form-control" value='' onChange={(e) => setFirstname(e.target.value)} />
                                </div> :
                                <div className="mb-3">
                                    <label className="form-label">First name</label>
                                    <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                            }
                            {
                                name === 'Not Specified' ?
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value='' onChange={(e) => setName(e.target.value)} />
                                </div> :
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            }
                            <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select className="form-select form-select" aria-label=".form-select-sm example"  onChange={e => setSex(e.target.value)}>
                                
                                {
                                    sex === 'Not Specified' ? 
                                    <option selected disabled>Not Specified</option> : <option>Not Specified</option>
                                }
                                {
                                    sex === 'Male' ? 
                                    <option selected disabled>Male</option> : <option>Male</option>
                                }
                                {
                                    sex === 'Female' ? 
                                    <option selected disabled>Female</option> : <option>Female</option>
                                }
                                {
                                    sex === 'Other' ? 
                                    <option selected disabled>Other</option> : <option>Other</option>
                                }
                                
                            </select>
                            </div>
                            <div className='row mb-3'>
                            {
                                age === 0 ? 
                                <div className="col">
                                    <label className="form-label">Age</label>
                                    <input id='inputAge' type="text" className="form-control" value='' onChange={(e) => setAge(e.target.value)} />
                                </div> :
                                <div className="col">
                                    <label className="form-label">Age</label>
                                    <input id='inputAge' type="text" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                            }
                            {
                                height === 0 ? 
                                <div className="col">
                                    <label className="form-label">Height</label>
                                    <input id='inputHeight' type="text" className="form-control" value='' onChange={e => setHeight(e.target.value)} />
                                </div> :
                                <div className="col">
                                    <label className="form-label">Height</label>
                                    <input id='inputHeight' type="text" className="form-control" value={height} onChange={e => setHeight(e.target.value)} />
                                </div>
                            }
                            {
                                weight === 0 ?
                                <div className="col">
                                    <label className="form-label">Weight</label>
                                    <input id='inputWeight' type="text" className="form-control" value='' onChange={e => setWeight(e.target.value)}/>
                                </div> :
                                <div className="col">
                                    <label className="form-label">Weight</label>
                                    <input id='inputWeight' type="text" className="form-control" value={weight} onChange={e => setWeight(e.target.value)}/>
                                </div>
                            }
                            </div>
                            {
                                goal === 'Not Specified' ?
                                <div className="mb-3">
                                    <label className="form-label">Goal</label>
                                    <input type="text" className="form-control" value='' onChange={e => setGoal(e.target.value)} />
                                </div> :
                                <div className="mb-3">
                                    <label className="form-label">Goal</label>
                                    <input type="text" className="form-control" value={goal} onChange={e => setGoal(e.target.value)} />
                                </div>
                            }
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning"  onClick={() => { registerInfos() }} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
}

export default ModifyInfosModal