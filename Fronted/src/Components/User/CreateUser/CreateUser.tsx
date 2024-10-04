import React, {useState} from 'react';
import {UserMutation} from "../../../Type.ts";
import {useAppDispatch} from "../../../store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {createUser} from "../UserThunk.ts";
import FromFiles from "../../FormFiles/FromFiles.tsx";

const emptyState:UserMutation = {
    username:"",
    password:"",
    displayName:"",
    image:null,
}

const CreateUser = () => {
    const [newUser, setNewUser] = useState<UserMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createUser(newUser))
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewUser(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    return (
        <div>
            <h3 className="mt-5">Create a account</h3>
            <form onSubmit={onSend}>

                <h5 className="mt-5">Write your name</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="username"
                           id="username"
                           onChange={onChange}
                           value={newUser.username}
                           required
                    />
                </div>


                <h5 className="mt-5">Write your display name</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="displayName"
                           id="displayName"
                           onChange={onChange}
                           value={newUser.displayName}
                           required
                    />
                </div>


                <h5 className="mt-5">You need to create a new password</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="password"
                           id="password"
                           onChange={onChange}
                           value={newUser.password}
                           required
                    />
                </div>

                <h5 className="mt-5 d-flex justify-content-center">Image</h5>
                <div className="mt-5 d-flex justify-content-center">
                    <div className="col-12 col-sm-6">
                        <FromFiles
                            name="image"
                            onChange={fileInputChangeHandler}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>

            </form>
        </div>
    );
};

export default CreateUser;