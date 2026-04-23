import React from "react";
import SelectTag from "../SelectTag/SelectTag.jsx";
import "./AddTags.css";

const AddTags = ({tags, onRemove, onOpenAdd }) => {
    return (
        <div className="tag-list">
            {tags.map((tag) => (
                <SelectTag className="tag" key={tag.id} {...tag} onRemove={() => onRemove(tag.id)} />
            ))}
            <button className="tag-list__add-btn" onClick={onOpenAdd}>
                +
            </button>
        </div>
    );
};

export default AddTags;