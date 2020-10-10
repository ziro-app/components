import React, { useState, useCallback, useMemo, useRef } from "react";
import { validateForm } from "./validateForm";
import type { Validation } from "./types";

export const useForm = <T>(validations: Validation<T>[], sendToBackend: () => Promise<void>) => {
    const [errors, setErrors] = useState<ReturnType<typeof validateForm>[1]>({});
    const [submitting, setSubmitting] = useState(false);
    const _validations = useMemo(
        () => validations,
        validations.map(({ value }) => value),
    );
    const _sendToBackend = useRef(sendToBackend);
    _sendToBackend.current = sendToBackend;
    const submitForm = useCallback(() => {
        const [formIsValid, errorMessages] = validateForm(_validations);
        setErrors(errorMessages);
        if (formIsValid) {
            setSubmitting(true);
            _sendToBackend.current().then(() => setSubmitting(false));
        }
    }, [_validations, _sendToBackend, validateForm]);
    return [errors, submitting, submitForm] as [typeof errors, boolean, typeof submitForm];
};
