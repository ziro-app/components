import React, { useState } from "react";

import Modal from "@bit/vitorbarbosa19.ziro.modal";
import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
import Icon from "@bit/vitorbarbosa19.ziro.icon";

import { modalBox, illustrationContainer, proposeContainer, titleText, bodyText } from "./styles";

const TooltipHelp = ({ illustration, title, body, iconColor = "#2D9CDB", iconSize = 16 }) => {
    const [modalHelp, setModalHelp] = useState(false);

    return (
        <>
            <Icon type="help" size={iconSize} color={iconColor} onClick={() => setModalHelp(true)} />
            <Modal boxStyle={modalBox} isOpen={modalHelp} setIsOpen={() => setModalHelp(false)}>
                {illustration ? (
                    <div style={illustrationContainer}>
                        <Illustration type={illustration} size={150} />
                    </div>
                ) : null}

                <div style={proposeContainer}>
                    {title ? <label style={titleText}>{title}</label> : null}

                    <label style={bodyText}>{body}</label>
                </div>
            </Modal>
        </>
    );
};

export default TooltipHelp;