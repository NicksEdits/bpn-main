import React, { useState, useContext, useEffect } from 'react'
import { UidContext } from '../AppContext';
import ModifyInfosModal from './ModifyInfosModal';
import ModifyInfosbioModal from './ModifyInfosbioModal';
import DeleteModal from './DeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../styles/Profile.css'
import NoPP from '../../assets/NoPP.png';


function Profile() {

  const uid = useContext(UidContext);

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(Number);
  const [sex, setSex] = useState('Not Specified');
  const [weight, setWeight] = useState(Number);
  const [height, setHeight] = useState(Number);
  const [goal, setGoal] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [file, setFile] = useState(null);

  // Refresh Informations
  useEffect(() => {
    const getProfile = () =>
    {
      fetch(`/user/profile/${uid}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then((data) => {
        setUsername(data.username);
        setFirstname(data.firstname);
        setName(data.name);
        setAge(data.age);
        setSex(data.sex);
        setWeight(data.weight);
        setHeight(data.height);
        setGoal(data.goal);
        setBio(data.bio);
        setProfilePicture(data.profilePicture);
      });
    }
    if ( uid !== null ) getProfile();
  }, [uid, username, firstname, name, age, sex, weight, height, goal, bio, profilePicture]);

  //Modify Profile Picture
  const uploadPic = (picture) => {
    console.log(picture);
    const formData = new FormData();
    formData.append('image', picture);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };
    axios.put(`user/profilepic/${uid}`, formData, config)
    .then((res) => {
      window.location = '/profile';
    })
    .catch((err) => console.log('CATCH', err));
  } 

  useEffect(() => {
    console.log(file);
    if(file !== null)
    {
      uploadPic(file);
    }
  }, [file]);

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (<div>
    
          {uid ? 
                <>
                <div className={ uid ? "bg-dark" : ""}>
                <div className="jumbotron jumbotron-fluid text-white caseprofil">
                  <div className="container text-center ">
                    <br></br>
                    
                    {
                      profilePicture === '' ? 
                          <div className='container profilePic'>
                            <label for="file-input">
                              <img src={NoPP} className="rounded-circle profile-picture" width="200" height="200"  alt="" for="file-input"/>
                            </label>
                            <span className="btn btn-lg bi bi-camera text-warning camera-btn"></span>
                            <input id="file-input" type='file' name='image' onChange={onInputChange} /> 
                          </div> 
                        : 
                          <div className='container profilePic' >
                            <label for="file-input">
                              <img src={profilePicture} className="rounded-circle profile-picture" width="200" height="200"  alt="" for="file-input"/>
                            </label>
                            <span className="btn btn-lg bi bi-camera text-warning camera-btn"></span>
                            <input id="file-input" type='file' name='image' onChange={onInputChange} /> 
                          </div>
                    }
                    <ToastContainer/>
                    <div id='Upload'></div>
                    <h1 className="display-4">{username}</h1>      
                    <p className='bio'>{bio}</p>
                    <button 
                      className="btn bi bi-pencil-square text-warning"
                      data-bs-toggle="modal" data-bs-target="#ModifyInfosbioModal"
                    ></button>
                  </div>
                </div>

                <div className="p-5 text-white">           
                  <div className="row ">
                    <div className="col-sm-6">
                        <h2 className="display-5 text-left"> Account </h2>
                    </div>
                  </div>
                  <hr className="text-warning"/> 
                  <div className='row'>
                    <div className='col'>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="card-text">
                            <ul className="list-group ">  
                                  <h3>
                                    <li className="list-group fw-light">Firstname : </li>
                                  </h3>
                                      <h5>{firstname}</h5> <hr className="text-warning"/>
                                  <h3>
                                    <li className="list-group fw-light">Name : </li>
                                  </h3>
                                      <h5>{name}</h5> <hr className="text-warning"/>
                                  <h3>
                                    <li className="list-group fw-light">Age : </li>
                                  </h3>
                                      {
                                        age === 0 ? <h5>Not Specified</h5> :  <h5>{age} years old</h5>
                                      } <hr className="text-warning"/>
                                  <h3>
                                    <li className="list-group fw-light">Gender : </li>
                                  </h3>
                                      <h5>{sex}</h5> <hr className="text-warning"/>
                              </ul>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="card-text"> 
                            <ul className="list-group ">               
                                <h3>  
                                  <li className="list-group fw-light">Height : </li>
                                </h3>
                                {
                                  height === 0 ? <h5>Not Specified</h5> : <h5>{height} cm</h5>
                                } <hr className="text-warning"/>
                                <h3>  
                                  <li className="list-group fw-light">Weight : </li>
                                </h3>
                                {
                                  weight === 0 ? <h5>Not Specified</h5> : <h5>{weight} kg</h5>
                                } <hr className="text-warning"/>
                                <h3>  
                                  <li className="list-group fw-light">Goal :</li>
                                </h3>
                                    <h5>{goal}</h5> <hr className="text-warning"/>
                                    <h3>  
                                      <li className="list-group fw-light">                         
                                        <button className="bouttonedit btn  border border-lg fs-2 btn-lg display-2  " 
                                                data-bs-toggle="modal" data-bs-target="#ModifyInfosModal">Edit Informations
                                        </button>
                                      </li>
                                    </h3>     
                              </ul>
                            
                          </div>
                        </div>
                      </div>  
                    </div>
                  </div>
                  <div className="text-end">
                    <button className=" button buttondelete btn btn border   " data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete   Account </button>
                  </div>
                </div>
                  <ModifyInfosModal uid={uid} 
                                    firstname={firstname} setFirstname={setFirstname}
                                    name={name} setName={setName}
                                    age={age} setAge={setAge}
                                    sex={sex} setSex={setSex}
                                    weight={weight} setWeight={setWeight}
                                    height={height} setHeight={setHeight}
                                    goal={goal} setGoal={setGoal} 
                                   />
                                    
                  <DeleteModal uid={uid} />
                  <ModifyInfosbioModal uid={uid} 
                                       bio={bio} setBio={setBio}  
                                       username={username} setUsername={setUsername}
                                       setProfilePicture={setProfilePicture}/>
                </div>                       
                </>  : 
                  (
                    <div className="text-center position-absolute top-50 start-50 translate-middle" >
                        <div className="spinner-border " style={{width: "10rem", height: "10rem"}} role="status"></div>
                        <br/>
                        <span>Loading ...</span>
                    </div>
                )
          }
          </div>)
}

export default Profile