import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FilterBox(props) {

  const onClick = (event) => {props.onClick(event.target.value)}

  return  <FormControlLabel control={<Checkbox defaultChecked onClick={onClick} value={props.value} />} label={props.value}/>
}
