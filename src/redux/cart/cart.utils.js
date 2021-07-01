export const addItemsToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.p_code === cartItemToAdd.p_code 
    )

    if(existingCartItem){
        return cartItems.map(cartItem =>
            cartItem.p_code === cartItemToAdd.p_code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.p_code === cartItemToRemove.p_code
    )

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.p_code !== cartItemToRemove.p_code)
    }

    return cartItems.map(cartItem =>
        cartItem.p_code === cartItemToRemove.p_code
            ? {...cartItem, quantity: cartItem.quantity -1 }
            :cartItem
        )
}