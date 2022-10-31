import {CSSProperties, useEffect, useState} from 'react'

interface UASProps {
    scale : number, 
    start : () => void
}

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20 ) : UASProps => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            clearInterval(interval)
                            setAnimated(false)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

interface DimensionProps {
    w : number, 
    h : number 
}

export const useDimension = () : DimensionProps => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    }, [])
    return {
        w, 
        h
    }
}

interface UseStyleProps {
    rectCircleStyle() : () => CSSProperties
}

const sinify : (scale : number) => number = (scale : number) : number => Math.sin(scale * Math.PI)
const maxScale  = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

export const useStyle = (w : number, h : number, scale : number) => {
    const position = "absolute"
    const size : number = Math.min(w, h) / 10
    const sf : number = sinify(scale)
    return {
        rectCircleStyle()  : CSSProperties {
            const top : string = `${h / 2 - size / 2}px`
            const left : string = `${w / 2 - size / 2 + (w / 2 - size / 2) * divideScale(sf, 1, 2)}px`
            const height : string = `${size}px`
            const width : string = `${size}px`
            const background : string = 'indigo'
            const transform = `rotate(${360 * divideScale(sf, 1, 2)}deg)`
            const borderRadius = `${50 * (1 - divideScale(sf, 0, 2))}%`
            return {
                position, 
                top, 
                left, 
                width, 
                height, 
                background, 
                transform,
                borderRadius 
            }
        }
    }
}