import React, { useContext }  from 'react';

import LoginModal from './Home/Modals/LoginModal'
import SignupModal from './Home/Modals/SignupModal'
import { UidContext } from './AppContext';
import '../styles/Banner.css';
 

function Banner()
{
    function acti(){
        
            document.addEventListener('DOMContentLoaded', () => 
        {
        const url = document.location.href;
        console.log(url);
        if ( url === 'http://localhost:3000/#about' )
        {
            document.getElementById('nav-abou').classList.add('active');
            document.getElementById('nav-home').classList.remove('active');
            document.getElementById('nav-off').classList.remove('active');
            document.getElementById('nav-feed').classList.remove('active');
            document.getElementById('nav-cont').classList.remove('active');
            console.log("hello")
        }
        else if ( url === 'http://localhost:3000/#feed' )
        {
            document.getElementById('nav-abou').classList.remove('active');
            document.getElementById('nav-home').classList.remove('active');
            document.getElementById('nav-off').classList.remove('active');
            document.getElementById('nav-feed').classList.add('active');
            document.getElementById('nav-cont').classList.remove('active');
            
        }
        else if ( url === "http://localhost:3000/#Contact" )
        {
            document.getElementById('nav-abou').classList.remove('active');
            document.getElementById('nav-home').classList.remove('active');
            document.getElementById('nav-off').classList.remove('active');
            document.getElementById('nav-feed').classList.remove('active');
            document.getElementById('nav-cont').classList.add('active');
        }
        else if ( url === "http://localhost:3000" )
        {
            document.getElementById('nav-abou').classList.remove('active');
            document.getElementById('nav-home').classList.add('active');
            document.getElementById('nav-off').classList.remove('active');
            document.getElementById('nav-feed').classList.remove('active');
            document.getElementById('nav-cont').classList.remove('active');
        }
        else if ( url === 'http://localhost:3000/#offer' )
        {
            document.getElementById('nav-abou').classList.remove('active');
            document.getElementById('nav-home').classList.remove('active');
            document.getElementById('nav-off').classList.add('active');
            document.getElementById('nav-feed').classList.remove('active');
            document.getElementById('nav-cont').classList.remove('active');
        }
    }); 
      }
    const uid = useContext(UidContext);

    function logout()
    {
        fetch('user/logout', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {
           window.location = "/"
        });
    }

    function handleNavbar(status)
    {
        if(status === null) {
            return <div>
            <button className="btn btn-warning text-dark border me-3" data-bs-toggle="modal" data-bs-target="#LoginModal">
                Login
            </button>
            <button className="btn btn-dark text-white border me-3" data-bs-toggle="modal" data-bs-target="#SignupModal">
                Sign up
            </button>
            </div>
            
        }
        else return <button className="btn btn-danger me-3" onClick={ logout }>Log out</button> 
    }

    return ( <div className='container-fluid'>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark border-bottom">
                    <div className="container-fluid">                      
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-start" id="navbarSupportedContent">
                        <div className="offcanvas-header bg-dark">
                            <h5 className="offcanvas-title text-light" id="offcanvasExampleLabel">Menu</h5>
                            <button type="button" className="btn-close bg-warning" data-bs-dismiss="offcanvas" 
                            aria-label="Close"></button>
                        </div>
                        <div className='offcanvas-body bg-dark'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navvv">
                                <li className="nav-item ">
                                <a id="nav-home" className="nav-link"  onClick={acti} href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                <a  id="nav-abou" className="nav-link" onClick={acti} href="/#about">About us</a>
                                </li>
                                <li className="nav-item">
                                <a  id="nav-off" className="nav-link" onClick={acti} href="/#offer">Offers</a>
                                </li>
                                <li className="nav-item">
                                <a  id="nav-feed" className="nav-link" onClick={acti} href="/#feed">Feedbacks</a>
                                </li>
                                <li className="nav-item">
                                <a  id="nav-cont" className="nav-link" onClick={acti} href="/#Contact">Contact</a>
                                </li>
                                {
                                    uid ? (<>
                                        <li className="nav-item">
                                        <span className="nav-link active text-warning">|</span>
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link" href="/profile">Profile</a>
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link" href="/workout">Workout</a>
                                        </li>
                                        <li className="nav-item">
                                        <span className="nav-link  disabled">Food</span>
                                        </li>
                                    </>) : null
                                }
                            </ul>
                            <div className='nav'>
                                {handleNavbar(uid)}
                            </div>
                        </div>
                        </div>                        
                    </div>
                </nav>
        
                <LoginModal/>
                <SignupModal/>
            </div>)
}
export default Banner