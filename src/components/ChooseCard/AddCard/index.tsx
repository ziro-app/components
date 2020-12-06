import React from "react";
import { AddCardProps } from "./props";
//@ts-ignore
import { primaryColor, grayColor4 } from "@ziro/theme";
import { container, cardNumber } from "../CardRow/style";
import { BrandIcon } from "../CardRow/BrandIcon";
import { motion } from "framer-motion";

export const AddCard = React.memo<AddCardProps>(({ onClick, color = primaryColor }) => (
    <motion.div onClick={onClick} style={container(false)} whileTap={{ scale: 0.95 }}>
        <BrandIcon brand="add" color={color} background={grayColor4} />
        <h2 style={{ ...cardNumber, color }}>Adicionar novo cartão</h2>
    </motion.div>
));

AddCard.displayName = "AddCard";
