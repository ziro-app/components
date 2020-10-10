import { fontTitle, fontSizeSmall } from "@ziro/theme";

export const container: React.CSSProperties = {
        display: "grid",
        gridRowGap: "20px",
        padding: "10px 0px",
    },
    dual: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridColumnGap: "10px",
    },
    regulatory: React.CSSProperties = {
        display: "grid",
        justifyItems: "center",
    },
    ziro: React.CSSProperties = {
        fontFamily: fontTitle,
        fontSize: fontSizeSmall,
    };
