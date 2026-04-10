// Tag.jsx
import "./SelectTag.css";

const SelectTag = ({ label, backgroundColor, textColor, onRemove }) => {
    return (
        <span
            className="tag"
            style={{ backgroundColor, color: textColor }}
        >
            {label}
            {onRemove && (
                <button className="tag__remove" onClick={onRemove}>
                    ✕
                </button>
            )}
        </span>
    );
};

export default SelectTag;