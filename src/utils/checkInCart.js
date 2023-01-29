export function checkInCart( cart, product ) {
    return cart.find(item => item.id === product.id);
}
