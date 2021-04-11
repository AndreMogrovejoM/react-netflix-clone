import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { selectUser } from '../../features/userSlice';
import { useSelector } from "react-redux";
import './Profile.css';
import { auth } from '../../backend/firebase';
import Plans from '../../components/plans/Plans';

function Profile() {
    const user = useSelector(selectUser);

    return (
        <div className="profile">
            <Navbar />
            <div className="profile__body">
                <h1>Edit Profile</h1>
                <div className="profile__info">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt=""
                    />
                    <div className="profile__details">
                        <h2>{user.email}</h2>
                        <div className="profile__plans">
                            <h3>Plans</h3>
                            <Plans />
                            <button
                             onClick={() => auth.signOut()}
                             className="profile__SignOut">Sign Out</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
