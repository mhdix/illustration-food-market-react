import { createContext, useContext, useReducer } from "react";
import cartReducer from './cartReducer';

const CartContext = createContext()
const CartContextDispatcher = createContext();

const initialState = {
    cart: [],
    total: 0,
    cartWishList: [],
}

const ProductProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState)
    return (
        <CartContext.Provider value={cart}>
            <CartContextDispatcher.Provider value={dispatch}>
                {children}
            </CartContextDispatcher.Provider>
        </CartContext.Provider>
    );
}

export default ProductProvider;

export const useCart = () => useContext(CartContext)
export const useCartAction = () => useContext(CartContextDispatcher)