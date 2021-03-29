import { useState } from "react"
import { EnumType } from "jazzi"
import getClassName from "getclassname"
import ThumbIcon from "../ThumbIcon"
import "./style.scss"

const State = EnumType("State", ["Available", "Voted"])
const Vote = EnumType("Vote", ["Positive", "Negative", "None"])

const parseEllapsed = (lastModified) => {
  const parsed = Date.parse(lastModified)
  if (isNaN(parsed)) {
    return ["Unkown", "days"]
  }
  const ellapsed = Date.now() - parsed
  const days = Math.floor(ellapsed / 8.64e7)
  const months = Math.floor(days / 31)
  const years = Math.floor(months / 12)

  if (years >= 1) {
    return [years, `year${years > 1 ? "s" : ""}`]
  } else if (months >= 1) {
    return [months, `month${months > 1 ? "s" : ""}`]
  } else {
    return [days, `day${days > 1 ? "s" : ""}`]
  }
}

const VoteComponent = ({ onSubmit, lastUpdated, category, small }) => {
  const [state, setState] = useState(State.Available)
  const [selected, setSelected] = useState(Vote.None)

  const root = getClassName({ base: "vote" })
  const optsCl = root.extend("&__options")
  const btnCl = optsCl.extend("&__button").recompute({
    "&--small": small,
  })
  const modifiedCl = root.extend("&__last-modified")

  const handleSubmit = (e) => {
    e.preventDefault()
    state.onAvailable(() => onSubmit(selected))
    setState(state.isAvailable() ? State.Voted : State.Available)
    setSelected(Vote.None)
  }

  const [amount, unit] = parseEllapsed(lastUpdated)

  return (
    <div className={root}>
      <div className={modifiedCl}>
        {state.match({
          Available: () => `${amount} ${unit} ago in ${category}`,
          Voted: () => "Thank you for voting!",
        })}
      </div>
      <div className={optsCl}>
        <ThumbIcon
          clickable
          type="positive"
          onClick={() => setSelected(Vote.Positive)}
          small={small}
          selected={selected.isPositive()}
          style={{ visibility: state.isAvailable() ? "visible" : "hidden" }}
        />
        <ThumbIcon
          clickable
          type="negative"
          onClick={() => setSelected(Vote.Negative)}
          small={small}
          selected={selected.isNegative()}
          style={{ visibility: state.isAvailable() ? "visible" : "hidden" }}
        />
        <button
          className={btnCl}
          onClick={handleSubmit}
          disabled={state.isAvailable() && selected.isNone()}
        >
          {state.match({
            Available: () => "Vote Now",
            Voted: () => "Vote Again",
          })}
        </button>
      </div>
    </div>
  )
}

export default VoteComponent
