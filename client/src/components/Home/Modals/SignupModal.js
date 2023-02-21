import { useState } from 'react';
import React from 'react';

function SignupModal()
{
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordConfirm, setInputPasswordConfirm] = useState('');

    // Clear Signup Modal
    function clearModal()
    {
        console.log('-> clearModal');
        setInputUsername('');
        setInputPassword('');
        setInputPasswordConfirm('');
        document.getElementById("usernameInput").className = "form-control";
        document.getElementById("passwordInput").className = "form-control";
        document.getElementById("passwordConfirmInput").className = "form-control";
        document.getElementById("ErrorSignup").className = "";
        document.getElementById("ErrorSignup").innerHTML = "";
    }
    
    // Create new User
    function handleSignup(){

        if(inputUsername === '')
        {
            setInputPassword('');
            setInputPasswordConfirm('');
            document.getElementById('ErrorSignup').className = "alert-danger";
            document.getElementById('ErrorSignup').innerHTML = "Invalid Username !";
            document.getElementById("usernameInput").className = "form-control border-danger";
            document.getElementById("passwordInput").className = "form-control";
            document.getElementById("passwordConfirmInput").className = "form-control";
        }
        else if(inputPassword.length < 8 || inputPassword.search(/[A-Z]/) < 0 || inputPassword.search(/[0-9]/) < 0)
        {
            document.getElementById('ErrorSignup').className = "alert-danger";
            document.getElementById('ErrorSignup').innerHTML = "Your password must have at least 8 characters 1 uppercase 1 numeric";
            document.getElementById("passwordInput").className = "form-control border-danger";
            document.getElementById("passwordConfirmInput").className = "form-control";
            document.getElementById("usernameInput").className = "form-control";
            setInputPassword('');
            setInputPasswordConfirm('');
        }
        else if(inputPassword !== inputPasswordConfirm)
        {
            document.getElementById('ErrorSignup').className = "alert-danger";
            document.getElementById('ErrorSignup').innerHTML = "Different passwords !";
            document.getElementById("passwordInput").className = "form-control border-danger";
            document.getElementById("passwordConfirmInput").className = "form-control border-danger";
            document.getElementById("usernameInput").className = "form-control";
            setInputPassword('');
            setInputPasswordConfirm('');
        }
        else{
            console.log('-> HandleSignup')
            const reactData = { username: inputUsername, password: inputPassword };
            fetch('/user/signup',
                {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( reactData )
                }
            )
            .then(response => response.json())
            .then( (data) => { 
                console.log(data);
                if(data.error)
                {
                    document.getElementById("usernameInput").className = "form-control border-danger";
                    document.getElementById("passwordInput").className = "form-control";
                    document.getElementById("passwordConfirmInput").className = "form-control";
                    document.getElementById('ErrorSignup').className = "alert-danger";
                    document.getElementById('ErrorSignup').innerHTML = data.error;
                    setInputUsername('');
                    setInputPassword('');
                    setInputPasswordConfirm('');
                }
                else 
                {
                    fetch('/user/login',
                        {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify( reactData )
                        }
                    )
                    .then(res => res.json())
                    .then(data => {
                        clearModal();
                        console.log(data);
                        window.location = '/workout';
                    }) 
                } 
            })
        }
    }


    return  (<div>
                <div className="modal fade" id="SignupModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sign up</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input 
                                            id='usernameInput'
                                            type="text" className="form-control" 
                                            value={inputUsername}
                                            onChange={ (e) => setInputUsername(e.target.value) }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            id='passwordInput'
                                            type="password" className="form-control" 
                                            value={inputPassword} 
                                            onChange={ (e) => setInputPassword(e.target.value) }    
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm password</label>
                                        <input
                                            id='passwordConfirmInput' 
                                            type="password" className="form-control"
                                            value={inputPasswordConfirm}
                                            onChange={(e) => setInputPasswordConfirm(e.target.value)}/>
                                    </div>
                                    <div id='ErrorSignup'></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-warning" onClick={ handleSignup } >Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)
}


export default SignupModal