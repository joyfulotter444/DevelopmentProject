export default function ShoppingCart(props) {
  return  <div id="shoppingCartContainer">
            <h2> Shopping Cart</h2>
              <div id="shoppingCart"> {props.cartContents.map((item) => <p> <strong> {item.name}: </strong> {item.price} </p>)} </div>
            <p> Total: ${props.cartTotal.toFixed(2)} </p>
          </div>
}