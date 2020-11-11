import React, { useRef, useCallback, useEffect, useState } from "react";
import { isPrompt } from "ziro-messages";
import { prompt } from "ziro-messages/dist/src/catalogo/camera";

const media = (f) => ({ video: { facingMode: f === "front" ? "user" : { ideal: "environment" } } });

export const useCamera = (onTakePicture, onError, startOnMount, initialFacingMode) => {
    const [picture, setPicture] = useState(null);
    const [cameraState, setCameraState] = useState("off");
    const track = useRef();

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const turnOn = useCallback(
        async (facingMode) => {
            try {
                if (track.current) {
                    track.current.stop();
                    track.current = null;
                }
                if (!navigator?.mediaDevices?.getUserMedia) throw prompt.BROWSER_EXCEPTION;
                const stream = await navigator.mediaDevices.getUserMedia(media(facingMode)).catch((error) => {
                    if (!error instanceof Error) throw prompt.UNKNOWN;
                    switch (error.name) {
                        case "NotAllowedError":
                            throw prompt.NOT_ALLOWED;
                        case "NotFoundError":
                            throw prompt.NOT_FOUND;
                        case "NotReadableError":
                            throw prompt.NOT_READABLE;
                        default:
                            throw prompt.UNKNOWN;
                    }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraState(facingMode || "on");
                    track.current = stream.getTracks()[0];
                }
            } catch (error) {
                if (isPrompt(error)) return onError(error);
                return onError(prompt.UNKNOWN);
            }
        },
        [onError, track],
    );

    const turnOff = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = null;
            setCameraState("off");
            if (track.current) {
                track.current.stop();
                track.current = null;
            }
        }
    }, [track]);

    const takePicture = useCallback(() => {
        if (!picture && canvasRef.current && videoRef.current) {
            let {
                videoHeight,
                videoWidth,
                parentElement: { clientHeight, clientWidth },
            } = videoRef.current;

            const sx = videoWidth > clientWidth ? (videoWidth - clientWidth) / 2 : 0;
            const sy = videoHeight > clientHeight ? (videoHeight - clientHeight) / 2 : 0;
            const width = Math.min(videoWidth, clientWidth);
            const height = Math.min(videoHeight, clientHeight);

            canvasRef.current.width = width;
            canvasRef.current.height = height;

            const context = canvasRef.current.getContext("2d");
            context.drawImage(videoRef.current, sx, sy, width, height, 0, 0, width, height);
            const dataImg = canvasRef.current.toDataURL("image/png");
            setPicture(dataImg);
            onTakePicture && onTakePicture(dataImg);
        }
    }, [picture, onTakePicture]);

    const deletePicture = useCallback(() => setPicture(null));

    useEffect(() => {
        startOnMount && turnOn(initialFacingMode);
        return () => track.current && track.current.stop();
    }, []);

    return [picture, videoRef, canvasRef, turnOn, turnOff, takePicture, deletePicture, cameraState];
};

export const useDisablePinchZoomEffect = (shouldDisable) => {
    useEffect(() => {
        if (!shouldDisable) return;
        const disablePinchZoom = (e) => e.touches.length && e.preventDefault();
        document.addEventListener("touchmove", disablePinchZoom, { passive: false });
        return () => document.removeEventListener("touchmove", disablePinchZoom);
    }, [shouldDisable]);
};
