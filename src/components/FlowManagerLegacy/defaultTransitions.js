export const

contentTransitions = {
    normal: { scale: 1, x: '0%', y: '0%', opacity: 1 },
    next: { x: '-20%', opacity: 0 },
    previous: { x: '20%', opacity: 0 },
    diverge: { scale: 0.8, opacity: 0 },
    converge: { y: '20%', opacity: 0 }
},

flowElementsTransitions = {
    normal: { opacity: 1 },
    next: { opacity: 0 },
    previous: { opacity: 0 },
    diverge: { opacity: 0 },
    converge: { opacity: 0 },
}