export default function DiceItem(props) {
    return <div> 
        <h3> {props.item.name}</h3>
    <img src = {props.item.image} alt = {props.item.description}/>
    <p> Price: ${props.item.price} </p>
    <p> Number of Sides: {props.item.numSides} </p>
    <p> Color: {props.item.color} </p>
    <p> Style: {props.item.style} </p>
    <button onClick={() => {props.add(props.item)}}>Add to Cart</button>
    <button onClick={() => {props.remove(props.item)}}>Remove from Cart </button>
    </div>
}
