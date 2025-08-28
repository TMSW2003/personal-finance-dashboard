import React from 'react';
import logo from "../assets/logo.png";

export default function Header() {
    return (
    <div className="flex items-center justify-center gap-2">
        <img src={logo} alt="" className="w-50 mt-2" />
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
    </div> 
    );
}