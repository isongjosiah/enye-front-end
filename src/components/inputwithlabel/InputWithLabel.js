import "bootstrap/dist/css/bootstrap.min.css";
import {InputGroup, FormControl, Button} from 'react-bootstrap'



// Search component handles the searching of records.
const InputWithLabel = ({
  id,
  label,
  type = "search",
  value,
  onInputChange,
  setFilter,
  isFocused,
  filter
}) => {
  return(
  <div className="container mt-4">
  <InputGroup>
<FormControl
  placeholder="Search"
  aria-label="Search"
  aria-describedby="basic-addon2"
  onChange = {onInputChange}
  value = {value}
/>
<InputGroup.Append>
  <Button variant="outline-primary" className = {filter === "Name"?"active":""} onClick= {()=> setFilter("Name")}>Name</Button>
  <Button variant="outline-primary" className = {filter === "Payement"?"active":""} onClick= {() => setFilter("Payement")}>Payement method</Button>
</InputGroup.Append>
</InputGroup>
  </div>
  )
};

export {InputWithLabel};
