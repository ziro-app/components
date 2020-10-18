import { fontTitle, fontSizeSmall, primaryColor } from "@ziro/theme";

export const card: (w: number) => React.CSSProperties = (width) => ({
        display: "grid",
        gridTemplateRows: "1fr 30px 30px 50px",
        maxWidth: "300px",
        width: "100%",
        height: width / 1.75,
        margin: "0 auto 15px",
        padding: "0 5%",
        borderLeft: `8px solid ${primaryColor}`,
        boxSizing: "border-box",
        borderRadius: "12px",
        color: primaryColor,
        boxShadow: `rgba(34, 34, 34, 0.65) 0px 5px 20px -8px`
    }),
    brandLogo: React.CSSProperties = {
        justifySelf: "end",
    },
    info: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gridColumnGap: "15px",
    },
    chip: React.CSSProperties = {
        width: "30px",
        height: "30px",
        background: `
		url('https://res.cloudinary.com/ziro/image/upload/v1569380926/chip_qurqrs.png')
		0 0 / 100% no-repeat`,
    },
    header: React.CSSProperties = {
        fontFamily: fontTitle,
        fontSize: fontSizeSmall,
        textTransform: "uppercase",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    cardcvv: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr 42px",
        justifyItems: "end",
    },
    cardnumber: React.CSSProperties = {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        fontFamily: fontTitle,
    };
