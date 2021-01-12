// Search component handles the searching of records.
const InputWithLabel = ({
  id,
  label,
  type = "text",
  value,
  onInputChange,
  isFocused
}) => {

  return (<>
    < label htmlFor = {id} > {label}</label> < input id = {id} type = {type} value= {value} onChange = {onInputChange} autoFocus />
  </>)
}

export { InputWithLabel }
