import { fontTitle, fontBody, fontSizeInput, gradient, primaryColor, shadow } from "@ziro/theme";

export const 
    modalBox = {
      display: "grid",
      gridRowGap: "20px",
      justifyItems: 'center',
      zIndex: "999",
      maxWidth: "500px",
      width: "90%",
      maxHeight: '80vh',
      margin: "0 auto",
      padding: "25px 25px 0",
      boxSizing: "border-box",
      overflow: 'auto',
      borderRadius: "3px",
      background: "white",
      boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
    1px 0px 8px 0px rgba(34,34,34,0.05)`,
    },
    closeIcon = {
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
    proposeContainer = {
        display: "grid",
        gridGap: "2px 0",
    },
    titleText = {
        fontFamily: fontTitle,
        textTransform: "uppercase",
        color: primaryColor,
        textAlign: "center",
    },
    bodyText = {
        textAlign: "center",
        fontFamily: fontBody,
        textTransform: 'none',
    },
    regular = {
      display: 'block', // necessary for link version
      WebkitAppearance: 'none',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      MozAppearance: 'none',
      outline: 'none',
      cursor: 'pointer',
      width: '100%',
      padding: '10px 0px',
      border: 'none',
      borderRadius: '20px',
      fontFamily: fontTitle,
      fontSize: fontSizeInput,
      color: '#FFF',
      textAlign: 'center',
      background: gradient,
      boxShadow: `${shadow}`,
      marginBottom: '35px'
    };
    
