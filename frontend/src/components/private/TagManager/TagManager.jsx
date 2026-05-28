// TagManager.jsx
import React from "react";
import "./TagManager.css";

const TagManager = ({ tags, onEdit, onDelete, onSelect }) => {
    return (
        <div className="tag-manager">
            {tags.map((tag) => (
                <div
                    key={tag.id}
                    className={`tag-manager__item ${onSelect ? "tag-manager__item--selectable" : ""}`}
                    style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
                    onClick={() => onSelect && onSelect(tag)}
                >
                    <span className="tag-manager__name">{tag.label}</span>
                    <div className="tag-manager__actions" onClick={(e) => e.stopPropagation()}>
                        <button className="tag-manager__btn" onClick={() => onEdit(tag)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                <path d="m15 5 4 4" />
                            </svg>
                        </button>
                        <button className="tag-manager__btn" onClick={() => onDelete(tag.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 11v6" /><path d="M14 11v6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                <path d="M3 6h18" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TagManager;

/*
const [tags, setTags] = useState([
  { id: 1, label: "Bajo en grasas", backgroundColor: "#C0DD97", textColor: "#27500A" },
  { id: 2, label: "Postres",        backgroundColor: "#F7C1C1", textColor: "#791F1F" },
  { id: 3, label: "Donas",          backgroundColor: "#B5D4F4", textColor: "#0C447C" },
  { id: 4, label: "Postres",        backgroundColor: "#CECBF6", textColor: "#3C3489" },
  { id: 5, label: "Postres",        backgroundColor: "#FAC775", textColor: "#633806" },
]);

const handleDelete = (id) => setTags(tags.filter((t) => t.id !== id));

<TagManager
  tags={tags}
  onEdit={(tag) => setEditModalOpen(true)}
  onDelete={handleDelete}
/>
 */