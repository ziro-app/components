import React, { useState } from "react";
import ReactDOM from "react-dom";

import Modal from "@bit/vitorbarbosa19.ziro.modal";
import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
import Icon from "@bit/vitorbarbosa19.ziro.icon";
import Button from "@bit/vitorbarbosa19.ziro.button";

import { modalBox, closeIcon, proposeContainer, titleText, bodyText, regular } from "./styles";
import './styles.css'
import { supportPhoneNumber } from '@bit/vitorbarbosa19.ziro.utils.support-phone-number'

const TooltipHelp = ({ illustration, illustrationSize = 150, title, body, iconColor = "#2D9CDB", iconSize = 16, supportButton = false }) => {
    const [modalHelp, setModalHelp] = useState(false);

    return (
        <>
            <Icon type="help" size={iconSize} color={iconColor} onClick={() => setModalHelp(true)} />
            {ReactDOM.createPortal(
                <Modal boxStyle={modalBox} isOpen={modalHelp} setIsOpen={() => setModalHelp(false)}>
                    <Icon type="close" size={30} color="black" onClick={() => setModalHelp(false)} strokeWidth={1} style={closeIcon} />
                    {illustration ? (
                        <div>
                            <Illustration type={illustration} size={illustrationSize} />
                        </div>
                    ) : null}

                    <div style={supportButton ? proposeContainer : {...proposeContainer, marginBottom: '35px'}}>
                        {title ? <label style={titleText}>{title}</label> : null}

                        <label style={bodyText}>{body}</label>
                    </div>

                    {supportButton ? (
                        <Button
                            style={regular}
                            type="button"
                            cta="Falar com Suporte"
                            click={() =>
                                window.open(`https://api.whatsapp.com/send?phone=${supportPhoneNumber.replace(/\+|\s|\(|\)|-/g, "")}`, "_blank")
                            }
                        />
                    ) : null}
                </Modal>,
                document.getElementById("app"),
            )}
        </>
    );
};

export default TooltipHelp;
