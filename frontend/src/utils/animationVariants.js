export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1,
                delay: delay,
                else: [0.25, 0.25, 0.25, 0.75],
            },
        },
    }
    
}