import { Link, useParams } from 'react-router-dom';
import { useCart, useCartAction } from './../../provider/ProductProvider';
import './ProductDetails.css'
import Layout from './../../layout/Layout';
import { useMenuAction } from './../../provider/MenuProvider';
import { useEffect } from 'react';
import { checkInCart } from './../../utils/checkInCart';
import * as data from '../../data.js'

import { useLocation } from "react-router-dom";

const ProductDetails = () => {
    const setMenu = useMenuAction()

    const { cart } = useCart();
    const dispatch = useCartAction();
    const { id } = useParams();
    const detail = data.food.filter((item) => {
        return item.id == id;
    })
    const addProductHandler = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    }
    const addToWishList = (wishList) => {
        dispatch({ type: 'ADD_TO_WISH_LIST', payload: wishList })
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
            <main className='cart-detail text-dark bg-dark py-5'>
                <Link to="/">
                    <div className="alert alert-dark w-50 m-auto mb-5">Go To Shop</div>
                </Link>
                {detail.map(product => {
                    return (
                        <div className='cart-detail_box text-dark text-dark d-flex w-75 m-auto' key={id}>
                            <div className="cart-detail_img">
                                <img src={product.imageDetail} alt={product.name} width="150" />
                            </div>
                            <div className="cart-detail_desc w-75">
                                <div className="cart-detail_text p-2">
                                    <h2>{product.name}</h2>
                                    <p>{product.title}</p>
                                    <p className='mt-2'>{product.ingredient}</p>
                                </div>
                                <div className='cart-detail_price'>
                                    <p>price : {product.price}$</p>
                                </div>
                                <div className="cart_detail_action btn-group d-flex justify-content-between">
                                    <button className="btn btn-success add-to-card" onClick={() => addProductHandler(product)}>{checkInCart(cart, product) ? "In Cart" : "Add To Cart"} </button>
                                    <button className="btn btn-sm btn-danger add-to-card fs-5" onClick={() => addToWishList(product)}>♥</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='product-desc my-5'>
                    <div className='ms-5'>
                        <h1 className='ms-4'>RATING</h1>
                    </div>
                    <div className='d-flex flex-wrap justify-content-evenly my-5'>
                        <div className="product-descreption_item">
                            <h2 className="product-descreption_title text-nowrap">people rate</h2>
                            <h3 className="product-descreption_rate">5 / 10</h3>
                        </div>
                        <div className="product-descreption_item ">
                            <h2 className="product-descreption_title text-nowrap">delivery speed</h2>
                            <h3 className="product-descreption_rate">8 / 10</h3>
                        </div>
                        <div className="product-descreption_item">
                            <h2 className="product-descreption_title text-nowrap">taste</h2>
                            <h3 className="product-descreption_rate">7 / 10</h3>
                        </div>
                    </div>
                </div>

                <h1 className='mb-0 ms-5'>OFFER</h1>
                <div className="product-slider d-flex flex-nowrap py-5 mx-5 overflow-auto scroll-touch" >
                    {data.food.map((product) => (
                        <div className='offer d-flex flex-column align-items-center p-2 m-2 position-relative'>
                            <div>
                                <img src={product.imageDetail} alt={product.name} width="80" />
                            </div>
                            <div>
                                <h2>{product.name}</h2>
                            </div>
                            <div className='text-center'>{product.ingredient}</div>
                            <div className='position-absolute bottom-0 mb-3'>
                                <button className="btn btn-success add-to-card" onClick={() => addProductHandler(product)}>{checkInCart(cart, product) ? "In Cart" : "Add To Cart"} </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    )
}
export default ProductDetails