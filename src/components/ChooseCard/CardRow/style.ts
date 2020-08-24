import { CSSProperties } from "react";
//@ts-ignore
import { primaryColor, grayColor4, fontBody, grayColor1 } from "@ziro/theme";
import { MotionProps } from "framer-motion";

export let container: (hasRightButton: boolean) => CSSProperties = (hasRightButton) => ({
    display: "grid",
    gridTemplateColumns: hasRightButton ? "60px 1fr 60px" : "60px 1fr",
    boxShadow: "0px 0px 3px 0px rgba(34, 34, 34, 0.3)",
    height: "60px",
    alignItems: "center",
    margin: "5px 0px",
    justifyItems: "center",
    borderRadius: "3px",
});

export let cardNumber: CSSProperties = {
    fontFamily: fontBody,
    color: primaryColor,
    textAlign: "center",
};

export let status: CSSProperties = {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 300,
    color: grayColor1,
};

export let button: CSSProperties = {
    height: "60px",
    width: "60px",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    borderLeft: `1px solid ${grayColor4}`,
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
};

export let visible: MotionProps["animate"] = { scaleY: 1, height: 70, opacity: 1 };
export let invisible: MotionProps["animate"] = { scaleY: 0, height: 0, opacity: 0 };
export let initialVisible: MotionProps["initial"] = { scaleY: 1, height: 70, opacity: 1 };
export let initialInvisible: MotionProps["initial"] = { scaleY: 0, height: 0, opacity: 0 };
