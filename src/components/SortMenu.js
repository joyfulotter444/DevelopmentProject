import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react'

// used material ui's material-ui/react-radio-button/#radio-group as a guide
export default function SortMenu(props) {
  /* state */
  const [value, setValue] = useState("default")
  const handleClick = (event) => {setValue(event.target.value);}

  return  <div>
            <FormControl>
              <FormLabel id="sort-buttons-group"> Sort By </FormLabel>
              <RadioGroup
                aria-labelledby="sort-buttons-group"
                defaultValue="default"
                name="sort-buttons-group"
                value = {value}
                // first update the internal state
                onClick={handleClick}
                // then update the parent funciton state
                onChange={props.addSort(value)}
              >
                {
                /* since the items have to be sorted by something in the beginning,
                   the default will be popularity, so that users can see the 
                   most popular items the fastest. Popularity is also not listed
                   on the item cards as it is the default sort */
                }
                <FormControlLabel value="default" control={<Radio/>} label="Popularity" />
                <FormControlLabel value="numSides" control={<Radio/>} label="Number of Sides" />
                <FormControlLabel value="price" control={<Radio/>} label="Price" />
              </RadioGroup>
          </FormControl>
          </div>
}

