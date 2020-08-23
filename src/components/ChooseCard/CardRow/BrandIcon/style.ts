import { CSSProperties } from "react";
// @ts-ignore
import { primaryColor } from "@ziro/theme";

export const container: (background?: string) => CSSProperties = (background = primaryColor) => ({
    display: "grid",
    width: 60,
    height: 60,
    background,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",
});
