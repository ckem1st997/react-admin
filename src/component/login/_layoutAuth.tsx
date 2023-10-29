import React, { ReactElement, createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';


//context 


export const LayputAuth = () => {
    return (

        <>
            <Outlet />
        </>

    );
};
