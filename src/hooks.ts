import {useEffect, useState} from 'react'

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