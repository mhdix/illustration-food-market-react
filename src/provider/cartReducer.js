const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            {
                const updateCart = [...state.cart];
                const updateItemIndex = updateCart.findIndex(item => item.id === action.payload.id);

                if (updateItemIndex < 0) {
                    updateCart.push({ ...action.payload, quantity: 1 })
                } else {
                    const updatedItem = { ...updateCart[updateItemIndex] };
                    updatedItem.quantity++;
                    updateCart[updateItemIndex] = updatedItem;
                }
                return { ...state, cart: updateCart, total: state.total + action.payload.price }
            }
        case "REMOVE_PRODUCT":
            {
                const updateProduct = [...state.cart];
                const updateItemIndex = updateProduct.findIndex(item => item.id === action.payload.id);
                if (updateProduct[updateItemIndex].quantity === 1) {
                    const filterProduct = updateProduct.filter(item => item.id !== action.payload.id)
                    return { ...state, cart: filterProduct, total: state.total - action.payload.price }
                } else {
                    const updateItem = { ...updateProduct[updateItemIndex] };
                    updateItem.quantity--;
                    updateProduct[updateItemIndex] = updateItem;
                    return { ...state, cart: updateProduct, total: state.total - action.payload.price }
                }
            }
        case "ADD_TO_WISH_LIST":
            {
                const updateWishList = [...state.cartWishList]
                const updateItemIndex = updateWishList.findIndex(item => item.id === action.payload.id)
                if (updateItemIndex < 0) {
                    updateWishList.push({ ...action.payload, wishList: true })
                }

                return { ...state, cartWishList: updateWishList }
            }
            case "DELETE_PRODUCT":
                {
                    const product = [...state.cart];
                    const filterProduct = product.filter(item => item.id !== action.payload.id)
                    return {...state , cart: filterProduct}
                }

        default:
            break;
    }
}

export default cartReducer