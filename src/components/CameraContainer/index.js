import React, { useState } from "react";
import Proptypes from "prop-types";
import Camera from "@bit/vitorbarbosa19.ziro.camera";
import CameraFallback from "@bit/vitorbarbosa19.ziro.camera-fallback";
import { PreviewOverlay, ShooterOverlay } from "@bit/vitorbarbosa19.ziro.camera-overlay";
import { useMessage } from "@bit/vitorbarbosa19.ziro.message-modal";

const CameraContainer = ({ startOnMount, initialFacingMode, onClose, onSend, allowSwap, fallbackComponent }) => {
    const setMessage = useMessage();
    const [picture, setPicture] = useState();

    return (
        <Camera
            startOnMount={startOnMount}
            initialFacingMode={initialFacingMode}
            onTakePicture={setPicture}
            onError={setMessage}
            fallbackComponent={fallbackComponent || <CameraFallback />}
            previewComponent={<PreviewOverlay onAccept={() => onSend(picture)} />}
        >
            <ShooterOverlay onClose={onClose} allowSwap={allowSwap} />
        </Camera>
    );
};

CameraContainer.propTypes = {
    startOnMount: Proptypes.bool,
    initialFacingMode: Proptypes.string,
    onSend: Proptypes.func.isRequired,
    onClose: Proptypes.func.isRequired,
    onTakePicture: Proptypes.func,
    allowSwap: Proptypes.bool,
};

export default CameraContainer;
