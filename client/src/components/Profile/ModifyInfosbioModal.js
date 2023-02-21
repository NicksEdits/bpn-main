import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function ModifyInfosbioModal( props )
{
    
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');

    //Update Form
    useEffect(() => {
        setBio(props.bio);
        setUsername(props.username);
    }, [props.bio, props.username])
    
    //Update backend
    function registerInfos()
    {
        // Si on change juste la bio
        const newdata = username === props.username ? {
            bio: bio
        } :
        // Si le pseudo change
        {
            username: username,
            bio: bio
        }
        fetch(`/user/profile/${props.uid}`,
            {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(newdata)
            }
        )
        .then((res) => res.json())
        .then(res => handleChanges(res));
    }

    // Update changes and handle errors
    function handleChanges(data){
        if(data.error)
        {
            toast.error(data.error);
            setBio(props.bio);
            setUsername(props.username);
        }
        else
        {
            props.setBio(bio);
            props.setUsername(username);
            toast.success("Informations Updated !");
        }
    }


    return <>
            <div className="modal fade" id="ModifyInfosbioModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Informations</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Change your bio</label>
                                <textarea type="text" className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning"  data-bs-dismiss="modal" onClick={ ()=> { registerInfos() }} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
}

export default ModifyInfosbioModal