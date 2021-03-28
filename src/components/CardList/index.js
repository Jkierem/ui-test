import getClassName from "getclassname"
import { EnumType } from "jazzi";

import './style.scss'

const capitalize = str => `${str.slice(0,1).toUpperCase()}${str.slice(1)}`
const Mode = EnumType("Mode",["Vertical","Horizontal","Grid"]);
const fromString = str => Mode[capitalize(str)]

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
const Card = ({ info, mode, baseClass }) => {
  const root = baseClass.extend("&__item").recompute({
    "&--vertical": mode.isVertical(),
    "&--horizontal": mode.isHorizontal(),
    "&--grid": mode.isGrid(),
  })

  return <article className={root}>

  </article>
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
    "&--grid-tablet": modeType.isGrid() && device.isTablet(),
    "&--grid-desktop": modeType.isGrid() && device.isDesktop(),
  })

  return <section className={root}>
    {data?.map((info,idx) => <Card key={idx} info={info} baseClass={root} mode={modeType} />)}
  </section>
}

export default CardList