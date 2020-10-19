import { fontTitle, fontBody, gradient, otherColor, primaryColor, fontSizeSmall, grayColor4 } from "@ziro/theme";

export const 
    modalBox = {
      display: "grid",
      gridRowGap: "20px",
      justifyItems: 'center',
      zIndex: "999",
      maxWidth: "500px",
      width: "90%",
      margin: "0 auto",
      padding: "25px 25px 35px",
      boxSizing: "border-box",
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
    };
    
