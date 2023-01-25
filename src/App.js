import './App.css';
import { useState } from 'react';
import diceData from './assets/dice-data.json';
import ShoppingCart from './components/ShoppingCart';
import SortMenu from './components/SortMenu';
import FilterBox from './components/FilterBox';
import DiceItem from './components/DiceItem';

// reused a lot of the code from my react-studio assignment
/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
diceData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  /* add your cart state code here */
  const[cartContents, updateCart] = useState([]);
  const[cartTotal,updateTotal] = useState(0);
  /* for filters by default all values are checked */
  const[colors,updateColors] = useState(["blue","red","green"])
  const[sides,updateSides] = useState([4,10,20])
  const[styles,updateStyles] = useState(["opaque","translucent","speckled"])
  /* default comparator is equal for every item
   need to wrap in an anonymous function because otherwise react interprets it wrong */
  const[sortBy,updateSort] = useState("default");
/* functions for aggregator */

  function addItem(item) {
    updateTotal(cartTotal + item.price)
    updateCart([...cartContents, item])
  }

  function removeItem(item) {
    // have to make sure all names for the items in my list are unique
    let index = cartContents.findIndex(listItem => (item.name === listItem.name));
    if (index !== -1) {
        updateTotal(cartTotal - item.price)
        // define a new list to avoid mutation of the state and then drop the item with the given index
        let list = cartContents
        list.splice(index,1)
        updateCart(list)
    } else {
        return
    }
  }

/* functions for filtering */
  function editColor(item) {
    if (!colors.includes(item)) {
      updateColors([...colors, item])
    } else {
      updateColors(colors.filter((color => color !== item)))
    }
  }

  function editSides(item) {
    // turn item back into int
    var item = parseInt(item)
    if (!sides.includes(item)) {
      updateSides([...sides, item])
    } else {
      updateSides(sides.filter((num => num !== item)))
    }
  }

  function editStyle(item) {
    if (!styles.includes(item)) {
      updateStyles([...styles, item])
    } else {
      updateStyles(styles.filter((style => style !== item)))
    }
  }

  function filterFunction(item) {
    return (colors.includes(item.color) && sides.includes(item.numSides) && styles.includes(item.style))
  }

/* functions for sorting */
  function addSort(label) {
    updateSort(label)
  }

  /* returns the matching comparator for the sorting label froms tate */
  function getComparator(label) {
    /* sorting comparators */
    function defaultSort(a,b) {
      if (a.popularity < b.popularity ) {
        return -1;
      }
      if (a.popularity > b.popularity) {
        return 1;
      }
      // else if they are equal
      return 0;
    }

    function compareNumSides(a, b) {
      if (a.numSides < b.numSides ) {
        return -1;
      }
      if (a.numSides > b.numSides) {
        return 1;
      }
      // else if they are equal
      return 0;
    }

    function comparePrice(a, b) {
      if (a.price < b.price ) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      // else if they are equal
      return 0;
    }
    if (label === "default") {
      return defaultSort
    }
    if (label === "numSides") {
      return compareNumSides
    }
    // else
    return comparePrice
  }
  

  /* applies all filters and sorts according to the state */
  function applyConditions(list) {
    // apply filters
    let newList = list.filter(filterFunction)
    // get the comparator from the sortBy state
    const comparator = getComparator(sortBy)
    // sort with the comparator
    newList = newList.sort(comparator);
    return newList
  }

  /* final return which handles the rendering */
  return (
    
    <div className="App">
      <h1> Polyhedral Dice Store </h1>
        <div className='row'>
          <div className="filtersContainer">
            <div className="filter">
              <h2> Color Filter </h2>
              <p> <strong> showing: </strong>  | {colors.map((color => color + " | "))}</p>
              <FilterBox onClick={editColor} value={"blue"} />
              <FilterBox onClick={editColor} value={"red"}/>
              <FilterBox onClick={editColor} value={"green"}/>
            </div>
            <div className="filter">
              <h2> Number of Sides Filter </h2>
              <p> <strong> showing: </strong>  | {sides.map((num => num + " sides " + " | "))}</p>
              <FilterBox onClick={editSides} value={4} />
              <FilterBox onClick={editSides} value={10}/>
              <FilterBox onClick={editSides} value={20} />
            </div>
            <div className="filter">
              <h2> Style Filter </h2>
              <p> <strong> showing: </strong>  | {styles.map((style => style + " | "))}</p>
              <FilterBox onClick={editStyle} value={"opaque"} />
              <FilterBox onClick={editStyle} value={"translucent"}/>
              <FilterBox onClick={editStyle} value={"speckled"}/>
            </div>
            <div className="filter">
              <SortMenu addSort={addSort}/>
            </div>
          </div>
          <div className="ItemContainer">
            {/* apply filters and sorting and pass props to each DiceItem(item) componenet to render them */}
            {applyConditions(diceData).map((item) => (
            <DiceItem item={item} add={addItem} remove={removeItem}/>
            ))}
          </div>
          <div className='ShoppingContainer'>
            {/* pass props to ShoppingCart(aggregator) componenet and render it */}
            <ShoppingCart cartContents={cartContents} cartTotal={cartTotal}/>
          </div>
        </div>
    </div>
  );
}

export default App;