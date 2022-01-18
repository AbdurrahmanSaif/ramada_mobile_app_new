
// it is used to find the given product in to the cart data.
export const findProductInCart = (cartData, product) => {
    return cartData.find(cartProduct => cartProduct.id === product.id);
}

// this function is used to update the cart data such as add / update / remove
export const updateCartData = (cartData, product, quantity) => {

    let newCart = [];

    const productInCart = findProductInCart(cartData, product);

    // if product is already added into the cart then we will update the quantity
    if (productInCart) {

        newCart = cartData.map(cartProduct => {
            // If the product is matched in the loop then we will just return a new object by updating the qt.
            return (cartProduct.id === product.id) ? { ...cartProduct, quantity } : cartProduct;
        });

    } else {
        // adding new product into the cart
        newCart = [...cartData, { ...product, quantity }];
    }

    // removing the product where quantity is 0
    newCart = newCart.filter(product => product.quantity !== 0);

    return newCart;
}


export const getTotal = (cartData) => cartData?.reduce((acc, product) => acc + parseInt(product.selling_price, 10) * parseInt(product.quantity, 10), 0);
