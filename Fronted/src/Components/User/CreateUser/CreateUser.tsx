import React, {useState} from 'react';
import {UserMutation} from "../../../Type.ts";
import {useAppDispatch} from "../../../store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {createUser} from "../UserThunk.ts";

const emptyState:UserMutation = {
    username:"",
    password:"",
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
            navigate('/showArtists');
        } catch(error) {
            console.log(error);
        }
    }

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

                <button type="submit" className="btn btn-danger mt-5 mb-5">Create</button>

            </form>
        </div>
    );
};

export default CreateUser;