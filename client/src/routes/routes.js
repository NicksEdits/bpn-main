import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Banner from "../components/Banner"
// Pages
import Home from "../components/Home/Home"
import Profile from "../components/Profile/Profile"
import Workout from "../components/Workout/Workout"
import AddStats from "../components/Workout/AddStats"
import Stats from "../components/Workout/Stats"

const index = () => {


    return(
        <Router>
            <Banner />
            <br/><br/>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/workout/addstats/:id" element={<AddStats />} />
                <Route path="/workout/stats/:id" element={<Stats />} />
                <Route render={() => <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default index;