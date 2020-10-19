import React, { useState } from "react";

import Modal from "@bit/vitorbarbosa19.ziro.modal";
import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
import Icon from "@bit/vitorbarbosa19.ziro.icon";
import Button from '../Button/index'

import { modalBox, closeIcon, proposeContainer, titleText, bodyText } from "./styles";
import { supportPhoneNumber } from '../utils/supportNumber'

const TooltipHelp = ({ illustration, title, body, iconColor = "#2D9CDB", iconSize = 16, supportButton = false }) => {
    const [modalHelp, setModalHelp] = useState(false);

    return (
        <>
            <Icon type="help" size={iconSize} color={iconColor} onClick={() => setModalHelp(true)} />
            <Modal boxStyle={modalBox} isOpen={modalHelp} setIsOpen={() => setModalHelp(false)}>
            <Icon type="close" size={30} color="black" onClick={() => setModalHelp(false)} strokeWidth={1} style={closeIcon} />
                {illustration ? (
                    <div>
                        <Illustration type={illustration} size={150} />
                    </div>
                ) : null}

                <div style={proposeContainer}>
                    {title ? <label style={titleText}>{title}</label> : null}

                    <label style={bodyText}>{body}</label>
                </div>

                {supportButton ? (
                        <Button
                            type="button"
                            cta="Falar com Suporte"
                            click={() =>
                                window.open(`https://api.whatsapp.com/send?phone=${supportPhoneNumber.replace(/\+|\s|\(|\)|-/g, "")}`, "_blank")}
                        />
                ) : null}
            </Modal>
        </>
    );
};

export default TooltipHelp;
