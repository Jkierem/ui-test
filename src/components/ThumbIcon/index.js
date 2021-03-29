import getClassName from "getclassname"
import thumbsUp from "../../assets/img/thumbs-up.svg"
import thumbsDown from "../../assets/img/thumbs-down.svg"
import "./style.scss"

/**
 * @param {{ type: "positive" | "negative", small: boolean, selected: boolean }} props
 */
const ThumbIcon = ({
  type,
  clickable = false,
  small = false,
  selected = false,
  ...extra
}) => {
  const accepted = type === "positive"
  const imgSrc = accepted ? thumbsUp : thumbsDown

  const root = getClassName({
    base: "thumb-icon",
    "&--selected": selected,
    "&--small": small,
    "&--positive": accepted,
    "&--negative": !accepted,
    "&--clickable": clickable,
  })

  return (
    <div className={root} {...extra}>
      <img alt={accepted ? "Thumbs up" : "Thumbs down"} src={imgSrc} />
    </div>
  )
}

export default ThumbIcon
