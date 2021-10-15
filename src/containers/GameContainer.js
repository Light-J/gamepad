import React, { useState, useEffect } from 'react'
import { useGamepads } from 'react-gamepads';
import { Canvas } from '@react-three/fiber';
import PlayerBox from '../components/PlayerBox'
import '../App.css';

const GameContainer = () => {
    const [gamepads, setGamepads] = useState({});
    const [xPosition, setX] = useState(0)
    const [yPosition, setY] = useState(0)
    const [actionPressed, setActionPressed] = useState(false)

    useGamepads(gamepads => setGamepads(gamepads));

    // const move = (velocity, direction) => {
    //     switch (direction) {
    //         case "left":
    //             setHorizontalSpeed(velocity)
    //             setX(xPostition + 1)
    //             break;
    //     }
    // }

    useEffect(() => {
        const defaultGamepad = Object.keys(gamepads).length > 0 ? gamepads[0] : {};
        if ("buttons" in defaultGamepad) {
          defaultGamepad.buttons[3].pressed ? setActionPressed(true) : setActionPressed(false);
        }
        if ("axes" in defaultGamepad) {
          // Each analog stick is an "axe"
          // Axes are delivered in a array of 2 numbers per axe
          // The first is left and right
          // The second is top and bottom
          // If a number is -1 or 1, it's one side or the other
    
          // Up
          -0.2 > defaultGamepad.axes[1] > 0.2 && setY((yPosition) => yPosition + 0.1);
          // Down
          0.2 > defaultGamepad.axes[1] < 0.2 && setY((yPosition) => yPosition - 0.1);
          // Left
          -0.2 > defaultGamepad.axes[0] > 0.2 && setX((xPosition) => xPosition - 0.1);
          // Right
          0.2 > defaultGamepad.axes[0] < 0.2 && setX((xPosition) => xPosition + 0.1);
        }
    }, [gamepads])

    if (gamepads[0]) {
        return <div>
            <Canvas className="Game-Screen">
                <ambientLight />
                <pointLight position={[400, 400, 10]} />
                <PlayerBox position={[xPosition, yPosition, 0]} />
            </Canvas>
        </div>
    }

    return <p>loading...</p>

}




export default GameContainer