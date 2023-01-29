import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDarkMode, useDarkModeAction } from '../../provider/DarkModeProvider'
import { useCart, useCartAction } from '../../provider/ProductProvider'
import './Navbar.css'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useMenu } from '../../provider/MenuProvider'
import { useMenuAction } from './../../provider/MenuProvider';

const menuChange = createContext()

const Navbar = () => {
    // const [darkMode, setDarkMode] = useState(false)
    // const darkModeHandler = () => {
    //     setDarkMode(!darkMode)
    //     console.log(darkMode);
    // }
    // const darkModeHandler = () => {
    //     setDarkMode(!darkMode)
    //     console.log(darkMode);
    // }

    const menu = useMenu()
    const setMenu = useMenuAction()
    
    const { cart, cartWishList } = useCart()
    const dispatch = useCartAction()
    const darkMode = useDarkMode();
    const setDarkMode = useDarkModeAction();
    const closeMenuHandler = () => {
        setMenu(!menu)
    }
    const deleteHandler = (product) => {
        dispatch({ type: "DELETE_PRODUCT", payload: product })
        toast.error(`${product.name} delete`)
    }

    const styles = {
        menuHandler: {
            transform: menu ? "" : "translateX(-650px)",
            transition: ".5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        },

        btnOpen: {
            display: menu ? "none" : ""
        }
    }
    return (
        <>

            {!menu && <div className='open-menu' style={styles.btnOpen} onClick={() => closeMenuHandler()} >
                <span >open menu</span>
            </div>
            }
            <div style={styles.menuHandler}>
                <div className={`col-4 ${darkMode ? 'text-dark bg-dark' : ''}`}>
                    <div className={`menu text-dark ${darkMode ? 'text-dark bg-dark' : ''}`}>
                        <ul>
                            <Link to="/cart" className='text-dark' style={{ position: "relative" }}>
                                <span className='cart-badge'>{cart.length}</span>
                                <li>
                                    <p>Cart</p>
                                    <img src="assets/img/shopping-basket.png" width="80" alt="" />
                                </li>
                            </Link>
                            <Link to="/" className='text-dark' style={{ position: "relative" }}>
                                <span className='wish-list-badge'>{cartWishList ? cartWishList.length : 0}</span>
                                <li className='mb-5'>
                                    <p>whish list</p>
                                    <img src="assets/img/shopping-basket.png" width="80" alt="" />
                                </li>
                            </Link>


                            {cart.map(item => (
                                <Link to={`/product/${item.id}`} className='text-dark'>
                                    <li key={item.id}>
                                        <p>{item.name}</p>
                                        <img src={item.image} width="80" alt="" />
                                        <div className='d-flex justify-content-evenly w-100 my-sm-2'>
                                            <p className='menu_quantity'>{item.quantity}</p>
                                            <Link className='mx-xl-3'><span className='menu-item-delete' onClick={() => deleteHandler(item)}>X</span></Link>
                                        </div>
                                    </li>
                                </Link>
                            ))}

                            <Link className='menu-close' onClick={() => closeMenuHandler()}>
                                <li className='bg-danger'>
                                    <span className='text-dark'>CLOSE MENU</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar