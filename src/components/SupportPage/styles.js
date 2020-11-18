import { fontTitle, gradient, primaryColor } from "@ziro/theme";

export const  
  header = {
      margin: '0 auto -20px'
  },
  container = {
      display: "grid",
      alignContent: "start",
      justifyItems: "center",
      gridGap: "25px 0"
  },
  illustrationContainer = {},
  proposeContainer = {
      display: "grid",
      gridRowGap: "4px",
      marginTop: "-15px"
  },
  buttonsContainer = {
      display: "grid",
      width: "100%",
      justifyItems: "center",
      gridGap: "10px 0",
  },
  titleText = {
      fontFamily: fontTitle,
      textTransform: "uppercase",
      color: primaryColor,
      textAlign: "center",
  },
  bodyText = {
      textAlign: "center",
      fontSize: '1.5rem'
  },
  highlightedButton = {
      WebkitAppearance: "none",
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      MozAppearance: "none",
      display: "grid",
      width: "100%",
      maxWidth: "80%",
      margin: "0 auto",
      padding: "8px 0px",
      fontFamily: fontTitle,
      fontSize: "1.3rem",
      color: "#FFF",
      textAlign: "center",
      outline: "none",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      background: gradient,
      boxShadow: `0px 3px 8px -3px rgba(34,34,34,0.65)`,
  }
