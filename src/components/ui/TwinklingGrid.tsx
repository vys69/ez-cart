"use client"

import { useState, useEffect, useCallback } from 'react'

const GRID_SIZE = 30
const ACTIVE_CELLS = 5
const FADE_DURATION = 1000 // ms

interface Cell {
    brightness: number
    fadeStart: number | null
}

export default function Component({ className = '' }: { className?: string }) {
    const [grid, setGrid] = useState<Cell[][]>(() =>
        Array(GRID_SIZE).fill(null).map(() =>
            Array(GRID_SIZE).fill(null).map(() => ({
                brightness: 0,
                fadeStart: null
            }))
        )
    )

    const activateCell = useCallback((row: number, col: number) => {
        setGrid(prevGrid => {
            const newGrid = [...prevGrid.map(row => [...row])]
            newGrid[row][col] = {
                brightness: 1,
                fadeStart: Date.now()
            }
            return newGrid
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            for (let i = 0; i < ACTIVE_CELLS; i++) {
                const row = Math.floor(Math.random() * GRID_SIZE)
                const col = Math.floor(Math.random() * GRID_SIZE)
                activateCell(row, col)
            }
        }, 100)

        return () => clearInterval(interval)
    }, [activateCell])

    useEffect(() => {
        const fadeInterval = setInterval(() => {
            const now = Date.now()
            setGrid(prevGrid =>
                prevGrid.map(row =>
                    row.map(cell => {
                        if (cell.fadeStart === null) return cell
                        const elapsed = now - cell.fadeStart
                        if (elapsed >= FADE_DURATION) {
                            return { brightness: 0, fadeStart: null }
                        }
                        return {
                            ...cell,
                            brightness: 1 - (elapsed / FADE_DURATION)
                        }
                    })
                )
            )
        }, 16) // ~60fps

        return () => clearInterval(fadeInterval)
    }, [])

    return (
        <div className={`absolute inset-0 z-0 bg-black text-white overflow-hidden pointer-events-auto ${className}`}>
            <div className="w-full h-full">
                <div className="grid grid-cols-[repeat(15,1fr)] gap-0.5 w-full h-full">
                    {grid.flat().map((cell, index) => (
                        <div
                            key={index}
                            className="aspect-square transition-all duration-200 ease-in-out bg-[#202020]"
                            style={{
                                opacity: 0.1 + cell.brightness * 0.5
                            }}
                            onMouseEnter={() => activateCell(Math.floor(index / GRID_SIZE), index % GRID_SIZE)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}