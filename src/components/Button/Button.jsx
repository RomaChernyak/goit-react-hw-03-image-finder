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