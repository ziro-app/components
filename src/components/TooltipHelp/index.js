import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Modal from "@bit/vitorbarbosa19.ziro.modal";
import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
import Icon from "@bit/vitorbarbosa19.ziro.icon";

import {
  modalBox,
  illustrationContainer,
  proposeContainer,
  titleText,
  bodyText,
} from "./styles";

const TooltipHelp = ({illustration, title, body, iconColor = '#2D9CDB', iconSize = 16}) => {
  const [modalHelp, setModalHelp] = useState(false);

  const HelpModal = () => {
    return (
        <Modal boxStyle={modalBox} isOpen={modalHelp} setIsOpen={() => setModalHelp(false)}>
            {illustration ? (<motion.div style={illustrationContainer}>
                <Illustration type={illustration} size={150} />
            </motion.div>) : null }
            

            <motion.div style={proposeContainer}>
                {title ? <motion.label style={titleText}>{title}</motion.label> : null }
                
                <motion.label style={bodyText}>
                    {body}
                </motion.label>
            </motion.div>
        </Modal>
    );
};

  return (
    <>
        <Icon type="help" size={iconSize} color={iconColor} onClick={() => setModalHelp(true)} />
        <HelpModal />
    </>
  )
}

export default TooltipHelp;