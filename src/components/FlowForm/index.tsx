import React, { useRef, cloneElement } from "react";
import { useForm } from "./utils/useForm";
import { useFooter } from "@bit/vitorbarbosa19.ziro.flow-manager";
import BottomFlowButtons from "@bit/vitorbarbosa19.ziro.bottom-flow-buttons";
import { container } from "./styles";
import type { FormComponent } from "./types";

const FlowForm: FormComponent = ({ validations, next, previous, padding, inputs }) => {
    const [errors, submitting, submitForm] = useForm(validations, next.onClick);

    const previousRef = useRef(previous?.onClick);

    previousRef.current = previous?.onClick;

    useFooter(<BottomFlowButtons next={submitForm} nextTitle={next.title} previous={previousRef.current} previousTitle={previous?.title} />, [
        submitForm,
        next.title,
        previousRef,
        previous?.title,
    ]);

    return (
        <form>
            <div style={container}>
                <div style={{ padding: padding || "10px 20px" }}>
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
                </div>
            </div>
        </form>
    );
};

export default FlowForm;
