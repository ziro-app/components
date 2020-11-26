import React, { useEffect, cloneElement } from "react";
import PropTypes from "prop-types";
import { useForm } from "./utils/useForm";
import Button from "../Button/index";
import Spinner from "../Spinner/index";
import { ModalSubmit } from "./ModalSubmit/index";
import { container, whiteSpace, submit, submitTop } from "./styles";

export { ModalSubmit };

const Form = ({
    useModalLayoutOnSubmit,
    successComponent,
    errorComponent,
    buttonName,
    buttonOnTop,
    validations,
    sendToBackend,
    summary,
    inputs,
    withoutBottomLabelOnSubmit,
}) => {
    const [errors, submitting, submitError, submitMsg, setSubmitMsg, submitForm] = useForm();
    useEffect(() => {
        // if user start typing on any field, reset submit message after 10 seconds
        const clearMsg = setTimeout(() => submitMsg ? setSubmitMsg("") : null, 10000);
        return () => clearTimeout(clearMsg);
    }, [inputs]);
    return (
        <form onSubmit={submitForm(validations, sendToBackend)}>
            <div style={container}>
                {inputs.map((reactElement, index) => {
                    if (reactElement.type === "div") {
                        const children = reactElement.props.children.map((element, innerIndex) => {
                            const InputTextWithSubmitting = cloneElement(element.props.input, { submitting });
                            const [match] = validations.filter((value) => value.name === element.props.name);
                            return cloneElement(element, {
                                key: `${index}-${innerIndex}`,
                                input: InputTextWithSubmitting,
                                errorMsg: match ? errors[match.name] : match,
                            });
                        });
                        return cloneElement(reactElement, { key: index, children });
                    } else {
                        const InputTextWithSubmitting = cloneElement(reactElement.props.input, { submitting });
                        const [match] = validations.filter((value) => value.name === reactElement.props.name);
                        return cloneElement(reactElement, {
                            key: index,
                            input: InputTextWithSubmitting,
                            errorMsg: match ? errors[match.name] : match,
                        });
                    }
                })}
                {buttonOnTop ? (
                    <>
                        {sendToBackend && <Button type="submit" cta={buttonName || "Enviar"} submitting={submitting} />}
                        <label style={submitTop(submitError)}>&nbsp;{submitting ? <Spinner size="3rem" /> : submitMsg}</label>
                    </>
                ) : (
                        <>
                            {summary && summary}
                            {useModalLayoutOnSubmit ? <div style={whiteSpace}></div> : null}
                            {withoutBottomLabelOnSubmit ? null : useModalLayoutOnSubmit ? (
                                <ModalSubmit
                                    isOpen={!!submitMsg}
                                    submitting={submitting}
                                    error={submitError}
                                    successComponent={successComponent}
                                    errorComponent={errorComponent}
                                    errorMsg={submitMsg}
                                />
                            ) : (
                                    <label style={submit(submitError)}>&nbsp;{submitting ? <Spinner size="3rem" /> : submitMsg}</label>
                                )}
                            {sendToBackend && <Button type="submit" cta={buttonName || "Enviar"} submitting={submitting} />}
                        </>
                    )}
            </div>
        </form>
    );
};

Form.propTypes = {
    useModalLayoutOnSubmit: PropTypes.bool,
    successComponent: PropTypes.func,
    errorComponent: PropTypes.func,
    buttonName: PropTypes.string,
    buttonOnTop: PropTypes.bool,
    validations: PropTypes.arrayOf(PropTypes.object).isRequired,
    sendToBackend: PropTypes.func,
    summary: PropTypes.element,
    inputs: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Form;
