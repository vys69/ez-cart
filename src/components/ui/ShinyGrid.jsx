import { useRef, useState, useEffect, useCallback } from "react"

const classNames = (...classes) => classes.filter(Boolean).join(" ")

/**
 * Hook for performing the callback within setInterval
 *
 * @callback callback
 * @param {number} delayMilliseconds
 */
function useInterval(callback, delayMilliseconds) {
  const intervalRef = useRef(null)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()
    intervalRef.current = window.setInterval(tick, delayMilliseconds)
    return () => window.clearInterval(intervalRef.current)
  }, [delayMilliseconds])
}

const randomInt = (min, max, r) =>
  Math.floor((r ?? Math.random()) * (max - min + 1) + min)

const randomItem = (arr, r) =>
  arr.length ? arr[randomInt(0, arr.length - 1, r)] : null

/**
 * ShinyGrid component
 *
 * @param {object} props
 * @param {number} [props.cellSize] Size of each grid cell in pixels
 * @param {number} [props.shineFrequency] How often a shine effect should occur (in milliseconds)
 * @param {number} [props.animationDuration] How long each shine animation should last (in milliseconds)
 * @param {string} [props.className]
 */
export default function ShinyGrid({
  cellSize = 70,
  shineFrequency = 500,
  animationDuration = 3000,
  className,
}) {
  const svgRef = useRef(null)

  const [state, setState] = useState({
    shines: [],
    lastShineId: 0,
  })

  useInterval(() => {
    if (!svgRef.current) return

    const now = new Date().getTime()
    const width = svgRef.current.getBoundingClientRect().width
    const height = svgRef.current.getBoundingClientRect().height
    const cellsX = Math.floor(width / cellSize)
    const cellsY = Math.floor(height / cellSize)

    const direction = ["up", "down", "left", "right"][randomInt(0, 3)]
    const horizontal = ["left", "right"].includes(direction)
    const vertical = !horizontal
    const begin = svgRef.current.getCurrentTime() + "s"
    const rx = Math.random(),
      ry = Math.random()

    setState((s) => {
      const { shines, lastShineId } = s
      const activeShines = shines.filter(
        ({ time }) => time + animationDuration > now,
      )

      // Prevent vertical intersections
      const x = vertical
        ? randomItem(
            [...Array(cellsX).keys()].filter(
              (i) =>
                !activeShines.find(
                  (as) => ["up", "down"].includes(as.direction) && as.x === i,
                ),
            ),
            rx,
          )
        : randomInt(0, cellsX, rx)

      // Prevent horizontal intersections
      const y = horizontal
        ? randomItem(
            [...Array(cellsY).keys()].filter(
              (i) =>
                !activeShines.find(
                  (as) =>
                    ["left", "right"].includes(as.direction) && as.y === i,
                ),
            ),
            ry,
          )
        : randomInt(0, cellsY, ry)

      const id = lastShineId + 1

      return x === null && y === null
        ? { ...s, shines: activeShines }
        : {
            shines: [
              ...activeShines,
              ...(x !== null && y !== null
                ? [
                    {
                      id,
                      time: now,
                      x: x,
                      y: y,
                      direction,
                      begin,
                    },
                  ]
                : []),
            ],
            lastShineId: id,
          }
    })
  }, shineFrequency)

  return (
    <div className={classNames("absolute shinygrid inset-0 overflow-hidden", className)}>
      <svg ref={svgRef} className="absolute inset-0" width="100%" height="100%">
        <defs>
          <pattern
            id="grid"
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              stroke="#ffffff29"
              strokeWidth={3}
            />
          </pattern>
          <radialGradient id="lightGradient">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect fill="url(#grid)" width="100%" height="100%" />

        {state.shines.map((shine) => {
          const isVertical = ["up", "down"].includes(shine.direction)
          const dir = {
            up: [0, -1],
            down: [0, 1],
            left: [-1, 0],
            right: [1, 0],
          }[shine.direction]

          return (
            <rect
              key={shine.id}
              fill="url(#lightGradient)"
              x={shine.x * cellSize - (isVertical ? 1 : 0)}
              y={shine.y * cellSize - (isVertical ? 0 : 1)}
              width={isVertical ? 2 : cellSize * 2}
              height={isVertical ? cellSize * 2 : 2}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to={dir.map((i) => i * cellSize * 6).join(" ")}
                dur={`${animationDuration}ms`}
                begin={shine.begin}
                fill="freeze"
                additive="sum"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${animationDuration}ms`}
                begin={shine.begin}
                fill="freeze"
              />
            </rect>
          )
        })}
      </svg>
    </div>
  )
}