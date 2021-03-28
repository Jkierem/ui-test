import getClassName from "getclassname";
import { useState } from "react";
import "./style.scss";

const Select = ({ onChange, value, options }) => {

  const [open, setOpen] = useState(false);

  const handleSelect = (value) => (e) => {
    e.stopPropagation()
    onChange(value);
    setOpen(false);
  }

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(o => !o)
  }

  const root = getClassName({
    base: "select",
    "&--open": open,
  })

  const optContainerCl = root.extend("&__options")
  const currentValueCl = root.extend("&__value")
  const optCl = root.extend("&__option")

  return <div className={root} onClick={handleToggle}>
    <div className={currentValueCl}>{options.find(opt => opt.value === value)?.label}</div>
    {open && <div className={optContainerCl}>
      {options.map((opt,idx) => <div key={idx} className={optCl} onClick={handleSelect(opt.value)}>{opt.label}</div>)}
    </div>}
  </div>
}

export default Select