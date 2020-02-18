export const

previewContainer = {
    position: 'absolute',
    background: 'white',
    bottom: '0px',
    right: '0px',
    left: '0px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '20px 5%',
    gridColumnGap: '5%'
},

shooterDownContainer = {
    display: 'flex',
    position: 'absolute',
    width: '100vw',
    height: '20%',
    background: 'rgba(0,0,0,0.5)', 
    bottom: '0px',
    justifyContent: 'center',
    alignItems: 'center'
},

shooterUpContainer = {
    display: 'flex',
    position: 'absolute',
    height: '10%',
    top: 0,
    right: 0,
    left: 0,
    background: 'transparent', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px'
},

shooterTogglesContainer = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px'
}