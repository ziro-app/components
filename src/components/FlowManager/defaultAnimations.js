export const

goLeft = {
    exit: { x: '-20%', opacity: 0 },
    enter: { x: '0%', opacity: 1 },
    initial: { x: '20%', opacity: 0 }
},

goRight = {
    exit: { x: '20%', opacity: 0 },
    enter: { x: '0%', opacity: 1 },
    initial: { x: '-20%', opacity: 0 }
},

diverge = {
    exit: { scale: 0.8, opacity: 0 },
    enter: { y: '0%', opacity: 1 },
    initial: { scale: 1, y: '20%', opacity: 0 }
},

converge = {
    exit: { y: '20%', opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    initial: { y: '0%', scale: 0.8, opacity: 0 }
}