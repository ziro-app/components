import { CSSProperties } from "react";

export const container: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridColumnGap: "10px",
    cursor: "pointer",
    userSelect: "none",
    msUserSelect: "none",
    MozUserSelect: "none",
    WebkitTapHighlightColor: "transparent",
};
