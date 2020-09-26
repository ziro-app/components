export const

    toggleButton = (size, active, color) => ({
        width: `${size}px`,
        height: `${size / 2}px`,
        background: active ? `${color}` : 'gray',
        borderRadius: '30px',
        padding: '5px',
        transition: 'all 300ms ease-in-out'
    }),

    innerCircle = (size, active) => ({
        width: `${size / 2}px`,
        height: `${size / 2}px`,
        background: '#fff',
        borderRadius: '50%',
        marginLeft: active ? `${size / 2}px` : 0,
        transition: 'all 200ms ease-in-out'
    })