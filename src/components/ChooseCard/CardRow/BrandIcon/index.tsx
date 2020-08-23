import React from "react";
// @ts-ignore
import Icon from "@bit/vitorbarbosa19.ziro.icon";
import { container } from "./style";
import { BrandIconProps } from "./props";

export const BrandIcon: React.FC<BrandIconProps> = ({ brand, color = "white", background }) => (
    <div style={container(background)}>{brand && <Icon type={brand} size={35} color={color} />}</div>
);
