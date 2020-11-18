import React from "react";
import { motion } from "framer-motion";

import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
import Header from '@bit/vitorbarbosa19.ziro.header'
import Button from "@bit/vitorbarbosa19.ziro.button";
import { useFooter } from "@bit/vitorbarbosa19.ziro.flow-manager";
import { containerWithPadding } from "@ziro/theme";

import {
    header,
    container,
    illustrationContainer,
    proposeContainer,
    buttonsContainer,
    titleText,
    bodyText
} from "./styles";
import { supportPhoneNumber } from "../utils/supportNumber";
import { SupportPageComponent } from "./types";

const SupportPage: SupportPageComponent =  ({previous, title, body}) => {
    useFooter(null);
    return (
      <div style={containerWithPadding}>
        <div style={header}>
          <Header type='icon-link' icon='back' navigateTo={previous} title='Falar com Suporte' />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={container}>
            <motion.div style={illustrationContainer}>
                <Illustration type="chatting" size={160} />
            </motion.div>
            <motion.div style={proposeContainer}>
                <motion.label key="title" style={titleText}>
                    {title}
                </motion.label>
                <motion.label key="body" style={bodyText}>
                    {body}
                </motion.label>
            </motion.div>
            <motion.div style={buttonsContainer}>
                <Button
                    type="button"
                    cta="Falar com Suporte"
                    click={() =>
                      window.open(`https://api.whatsapp.com/send?phone=${supportPhoneNumber.replace(/\+|\s|\(|\)|-/g, "")}`, "_blank")}
                />
            </motion.div>
        </motion.div>
      </div>
    );
};

export default SupportPage