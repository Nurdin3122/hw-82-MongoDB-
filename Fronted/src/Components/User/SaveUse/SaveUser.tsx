import React, {useState} from 'react';
import {UserMutation} from "../../../Type.ts";
import {useAppDispatch} from "../../../store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {saveUser} from "../UserThunk.ts";
import {GoogleLogin} from "@react-oauth/google";

const SaveUser = () => {
    const [newSaveUser, setNewSaveUser] = useState<UserMutation>({
        username:"",
        password:"",
    });
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSaveUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(saveUser(newSaveUser))
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h3 className="mt-5">Save your account</h3>
            <div>
                <GoogleLogin onSuccess={(credentialResponse) => {
                    console.log(credentialResponse)
                }}/>
            </div>
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
                           value={newSaveUser.username}
                           required
                    />
                </div>

                <h5 className="mt-5">you have to write your password</h5>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="password"
                           id="password"
                           onChange={onChange}
                           value={newSaveUser.password}
                           required
                    />
                </div>

                <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>
            </form>
        </div>
    );
};

export default SaveUser;