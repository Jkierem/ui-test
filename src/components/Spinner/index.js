import getClassName from "getclassname"
import "./style.scss"

const Spinner = () => {
  const root = getClassName({ base: "spinner" })
  const dotCl = root.extend("&__dot")

  return <div className={root} aria-hidden="false" aria-label="Loading">
    <div className={dotCl} />
    <div className={dotCl} />
    <div className={dotCl} />
  </div>
}

export default Spinner