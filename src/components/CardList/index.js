import getClassName from "getclassname"
import { EnumType } from "jazzi"
import { Vote } from ".."
import { submitVote } from "../../middleware/database"
import AcceptanceBar from "../AcceptanceBar"
import ThumbIcon from "../ThumbIcon"

import "./style.scss"

const capitalize = (str) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
const Mode = EnumType("Mode", ["Vertical", "Horizontal", "Grid"])
const fromString = (str) => Mode[capitalize(str)]

/**
 * @typedef {{
 *  name: string;
 *  description: string;
 *  category: string;
 *  picture: string;
 *  lastUpdated: string;
 *  votes: {
 *    positive: number;
 *    negative: number;
 *  }
 * }} PollData
 */

/**
 * @param {{
 *  info: PollData;
 *  baseClass: string;
 *  mode: import("jazzi").EnumTypeValue;
 * }} props
 * @returns {JSX.Element}
 */
const Card = ({ id, info, mode, baseClass, device }) => {
  const { name, picture, description, votes, lastUpdated, category } = info

  const root = baseClass.extend("&__item").recompute({
    "&--vertical": mode.isVertical(),
    "&--horizontal": mode.isHorizontal(),
    "&--grid": mode.isGrid(),
  })

  const imgCl = root.extend("&__image")
  const nameCl = root.extend("&__name")
  const barCl = root.extend("&__bar")
  const iconCl = root.extend("&__icon")
  const contentCl = root.extend("&__content")
  const voteCl = contentCl.extend("&__vote")

  const handleSubmitVote = (vote) => {
    submitVote(id, vote)
  }

  return (
    <article className={root}>
      <img className={imgCl} src={picture} alt={`${name}'s picture`} />
      <div className={nameCl}>
        {name}
        <div>{description}</div>
      </div>
      <div className={barCl}>
        <AcceptanceBar {...votes} />
      </div>
      <div className={iconCl}>
        <ThumbIcon
          small={device.isMobile()}
          type={votes.positive - votes.negative >= 0 ? "positive" : "negative"}
        />
      </div>
      <div className={contentCl}>
        <div className={voteCl}>
          <Vote
            small={device.isMobile()}
            lastUpdated={lastUpdated}
            category={category}
            onSubmit={handleSubmitVote}
          />
        </div>
      </div>
    </article>
  )
}

/**
 * @param {{
 *  data: PollData[]
 *  mode: "vertical" | "horizontal" | "grid"
 *  device: import("jazzi").EnumTypeValue
 * }} props
 * @returns {JSX.Element}
 */
const CardList = ({ data, mode, device }) => {
  const modeType = fromString(mode)
  const root = getClassName({
    base: "cardlist",
    "&--vertical": modeType.isVertical(),
    "&--horizontal": modeType.isHorizontal(),
    "&--grid": modeType.isGrid(),
    "&--grid-tablet": modeType.isGrid() && device.isTablet(),
    "&--grid-desktop": modeType.isGrid() && device.isDesktop(),
  })

  const container = root.extend("&__container")

  return (
    <div className={container}>
      <section className={root}>
        {data?.map(([id, info], idx) => (
          <Card
            key={idx}
            id={id}
            info={info}
            baseClass={root}
            mode={modeType}
            device={device}
          />
        ))}
      </section>
    </div>
  )
}

export default CardList
