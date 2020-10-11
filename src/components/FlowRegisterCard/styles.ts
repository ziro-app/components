import { fontTitle, fontSizeSmall, primaryColor, fontWeightMuted } from "@ziro/theme";

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
    },
    summaryContainer: React.CSSProperties = {
        margin: "20px 0 0",
        padding: "15px 0 0",
        borderTop: `2px solid ${primaryColor}`,
        color: primaryColor,
    },
    summary: React.CSSProperties = {
        display: "grid",
    },
    title: React.CSSProperties = {
        fontFamily: fontTitle,
        fontSize: fontSizeSmall,
        textTransform: "uppercase",
        marginBottom: "10px",
    },
    service: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
    },
    total: React.CSSProperties = {
        justifySelf: "end",
    },
    amount: React.CSSProperties = {
        justifySelf: "end",
        fontSize: fontSizeSmall,
        fontWeight: fontWeightMuted,
    };
