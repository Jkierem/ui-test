import { Maybe } from "jazzi"

import thumbsUp from "../../assets/img/thumbs-up.svg"
import thumbsDown from "../../assets/img/thumbs-down.svg"
import "./style.scss"

const AcceptanceBar = ({ positive, negative }) => {
  const [pos, neg] = Maybe.fromPredicate(() => positive + negative !== 0, [
    positive,
    negative,
  ])
    .map(([pos, neg]) => {
      const total = pos + neg
      const positivePercentage = Number(((pos * 100) / total).toFixed(1))
      const negativePercentage = (100 - positivePercentage).toFixed(1)
      return [positivePercentage, negativePercentage]
    })
    .onNone(() => [50, 50])

  return (
    <div className="acceptance">
      <div className="acceptance__positive" style={{ width: `${pos}%` }}>
        <img
          className="acceptance__positive__thumbs"
          src={thumbsUp}
          alt="Thumbs Up"
        />
        {pos}%
      </div>
      <div className="acceptance__negative" style={{ width: `${neg}%` }}>
        {neg}%
        <img
          className="acceptance__negative__thumbs"
          src={thumbsDown}
          alt="Thumbs Down"
        />
      </div>
    </div>
  )
}

export default AcceptanceBar
