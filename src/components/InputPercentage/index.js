import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import currencyFormat from "@ziro/currency-format";
import maskInput from "@ziro/mask-input";
import { inline, styleTag } from "./styles";

const InputPercentage = forwardRef(({ value, setValue, style = inline, css = styleTag, disabled, submitting, ...rest }, ref) => {
    const inputProps = { style, disabled: disabled || submitting, ref, inputMode: "numeric", placeholder: "% 20", ...rest };
    return (
        <>
            <style>{css}</style>
            <input
                {...inputProps}
                className="input-text"
                value={currencyFormat(value) ? `% ${currencyFormat(value).replace(/[R$]/g, "")}` : ""}
                onChange={({ target: { value } }) => {
                    if (value === "% 0,0") setValue("");
                    else {
                        const toInteger = parseInt(value.replace(/[\.,\s%]/g, ""), 10);
                        setValue(
                            toInteger
                                ? toInteger <= 10000
                                    ? maskInput(toInteger, "#######", true)
                                    : maskInput(10000, "#######", true)
                                : toInteger === 0
                                ? "0"
                                : "",
                        );
                    }
                }}
            />
        </>
    );
});

InputPercentage.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    style: PropTypes.object,
    css: PropTypes.string,
    disabled: PropTypes.bool,
    submitting: PropTypes.bool,
};

export default InputPercentage;
