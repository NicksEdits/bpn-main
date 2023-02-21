import { useState } from 'react';
import React from 'react';

function LoginModal()
{

    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    // Clear Login Modal
    function clearModal()
    {
        console.log('-> clearModal');
        setInputUsername('');
        setInputPassword('');
        document.getElementById("LoginUsernameInput").className = "form-control";
        document.getElementById("LoginPasswordInput").className = "form-control";
        document.getElementById("ErrorLogin").className = "";
        document.getElementById("ErrorLogin").innerHTML = "";
    }

    const Login = () => {
        console.log('-> LOGIN');

        const reactData = { username: inputUsername, password: inputPassword };
        
        fetch('/user/login',
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify( reactData )
            }
        )
        .then(res => res.json())
        .then(data => {
            if(data.error)
            {
                document.getElementById("LoginUsernameInput").className = "form-control border-danger";
                document.getElementById("LoginPasswordInput").className = "form-control border-danger";
                document.getElementById("ErrorLogin").className = "alert-danger";
                document.getElementById("ErrorLogin").innerHTML = data.error;
            }
            else {
                clearModal();
                console.log(data);
                window.location = '/workout';
            }
        })

    }

    return (<div className="modal fade" id="LoginModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Log in</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                id="LoginUsernameInput"
                                type="text" className="form-control" 
                                value={inputUsername}
                                onChange={ (e) => setInputUsername(e.target.value) }
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                id="LoginPasswordInput"
                                type="password" className="form-control" 
                                value={inputPassword} 
                                onChange={ (e) => setInputPassword(e.target.value) }    
                            />
                        </div>
                        <div id="ErrorLogin"></div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-warning" onClick={ Login } >Connect</button>
                </div>
                </div>
            </div>
            </div>)
}


export default LoginModal