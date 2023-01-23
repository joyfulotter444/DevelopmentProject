# Development

### Link to Deployed Website
https://joyfulotter444.github.io/DevelopmentProject/

### Goal and Value of the Application
The goal of the website is offer a convenient way for people looking to buy dice
for role playing or other games to browse your options. It provides the value of
being able to quickly and efficiently find the perfect dice you are looking for
by invoking a series of filter and/or sorting by common dice attributes.

### Usability Principles Considered
The website is designed to be simple and clear for the user to understand and
use. 

The system status is kept as visible as possible: filters show not only
which checkboxes are selected, but also a dynamic list spelled out in text about
which categories of items are being displayed on screen, so that users can see
or hear if they are using screen readers how their selections affect the 
selections in three different ways: through the item cards displayed on screen,
the lists displayed by the filters, and the state of the checkboxes themselves.
The text "showing:" and the checkboxes being checked by default communicates 
clearly to the user that the checkboxes are "or" filters, not and filters.
Finally, the shopping cart is directly visible, not hidden behind a menu,
so users can see items are added or removed from the cart as it happens, and
their calcualted total price.

The system is also as flexible as possible, supporting every combination
of filter and sorting activated in any order. 
It is also consistent, making the same selections will always lead to the same
items shown on screen, regardless of the order of selections

The design is minimalist, with only essential visual design elements and heading
info allows users to quickly get the info they need

And finally, it matches the mental model that users have from shopping in a 
phsycial store. Removing and adding individual items from a container on screen
mirrors putting items in and taking items out of a phsycial cart, and the
filters and sorting allow users to creates groupings similar to aisles or
sections of similar items that users would find in a real store

### Organization of Components
There are five components: ShoppingCart, SortMenu, FilterBox, DiceItem,
and the parent componenet of them all: App. ShoppingCart handles the 
visual appearance of the shopping cart section, SortMenu handles sorting
and the radio buttons for sorting, FilterBox is used for each of the check boxes
which are organized into groups of three boxes for each filtering category 
(color, style, number of sides), DiceItem is used to generate each item card
and App handles rendering and keeping track of state for most things.


### How Data is Passed Down Through Components
The parent componenet App keeps track of the state of the shopping cart, and
passes functions for adding and remove items to each of the DiceItems. The 
DiceItems use those functions on click to update the state of the shopping cart
list in the parent componenet, which passes the updated list to the ShoppingCart
to display.
App also keeps track of the state of the three filters with lists that keep
track of which filters are selected or not selected. App passes a function
to add or remove items from the filter lists to the FilterBox components, and
the FilterBox components use those functions on click to update the state.
SortMenu is the only component that has its own state and onClick function
which it uses to keep track of which sorting radio button is selected. The App
component passes a function to update the state of the sorting state that it
also tracks, which the SortMenu uses onChange to set the state of the parent
component.

### How the User Triggers State Changes
As detailed above the user triggers state changes by clicking buttons, 
unclicking or clicking checkboxes, or selecting radio buttons.

