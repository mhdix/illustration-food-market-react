import React from 'react'
import { createContext, useContext } from 'react';
import { useState } from 'react';

const MenuHandler = createContext();
const MenuHandlerDispatcher = createContext();
const MenuProvider = ({ children }) => {

    const [menu, setMenu] = useState(true)

    return (
        <MenuHandler.Provider value={menu}>
            <MenuHandlerDispatcher.Provider value={setMenu}>
                {children}
            </MenuHandlerDispatcher.Provider>
        </MenuHandler.Provider>
    )
}

export default MenuProvider;

export const useMenu = () => useContext(MenuHandler)
export const useMenuAction = () => useContext(MenuHandlerDispatcher)