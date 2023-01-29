import Layout from "../../layout/Layout";
import * as data from "../../data.js";
import { useCart, useCartAction } from "../../provider/ProductProvider";
import { useDarkMode } from "../../provider/DarkModeProvider";

import { toast } from 'react-toastify';
import { checkInCart } from "../../utils/checkInCart";
import { useEffect } from "react";
import { useMenuAction } from './../../provider/MenuProvider';
import { Link, useLocation } from 'react-router-dom';
import Search from "../../common/Search";

const HomePage = () => {
    const setMenu = useMenuAction()
    const darkMode = useDarkMode()
    const { cart } = useCart()
    const dispatch = useCartAction();

    const addProductHandler = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product })
        toast.success(`${product.name} added to cart`)
    }

    const addToWishList = (wishList) => {
        dispatch({ type: "ADD_TO_WISH_LIST", payload: wishList })
        toast.success(`${wishList.name} added to Wishlist ♥`)
    }
    useEffect(() => {
        setMenu(true)
    }, [])

    // scroll to top
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Layout>
            <Search />
            <div className={`food-main text-dark bg-dark ${darkMode ? 'text-dark bg-dark' : ''}`}>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-end">
                    {data.food.map(product => {
                        return (
                            <div className="food" key={product.id}>
                                <div className="food_img">
                                    <img src={product.image} width="150" alt={product.name} />
                                </div>
                                <div
                                    className="food_content position-relative d-flex flex-column justify-content-center align-items-center">
                                    <Link to={`/product/${product.id}`} className="text-center text-dark">
                                        <h2 className="food_title">{product.name}</h2>
                                        <p className="food_caption text-center">{product.ingredient}</p>
                                        <div className="food_detail d-flex flex-column align-items-center ">
                                            <p className="food_price">{product.price}$</p>
                                        </div>
                                    </Link>
                                    <div className="w-100 btn-group d-flex justify-content-between">
                                        <button className="btn btn-success add-to-card mx-2 w-auto" onClick={() => addProductHandler(product)}>{checkInCart(cart, product) ? "In Cart" : "Add To Cart"}</button>
                                        <button className="btn btn-sm btn-danger add-to-card w-auto fs-5" onClick={() => addToWishList(product)}>♥</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </Layout>
    );
}

export default HomePage;