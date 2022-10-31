import React from "react";
import { useStyle } from "./hooks";
import withContext from "./withContext";

interface CTRSProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void
}

const CircleToRectSquare = (props : CTRSProps) => {
    const {rectCircleStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {rectCircleStyle()} onClick = {() => {
            props.onClick()
        }}>

        </div>
    )
}

export default withContext(CircleToRectSquare)