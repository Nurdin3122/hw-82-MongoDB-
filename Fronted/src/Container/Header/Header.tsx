import React from "react";
import {useAppSelector} from "../../store/hooks.ts";
import {userState} from "../../Components/User/UserSlice.ts";
import HeaderForLogin from "./HeaderForLogin.tsx";
import HeaderForAnnon from "./HeaderForAnnon.tsx";


const Header = () => {
    const user = useAppSelector(userState)
    return (
        <div>
        {
            user ? (
                <HeaderForLogin/>
            ) : (
                <HeaderForAnnon/>
            )
        }
        </div>
    );
};

export default Header;