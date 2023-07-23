import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ onFindMore, text }) => {
    return (
        <button
            className={css.button_loadmore}
            onClick={onFindMore}>
            {text}
        </button>
    )
}

Button.propTypes = {
    onFindMore: PropTypes.func,
    text: PropTypes.string.isRequired,
};