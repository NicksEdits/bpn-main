import React from 'react';

function DeleteModal({uid}) {

    function DeleteAcc()
    {
        fetch(`/user/profile/${uid}`,
        {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            window.location = '/';
        });
    }

    return <div className="modal fade" id="DeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Delete Confirmation</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    Are you sure you want to delete your account ?
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={DeleteAcc} >Delete</button>
                    </div>
                </div>
                </div>
            </div>  
}

export default DeleteModal