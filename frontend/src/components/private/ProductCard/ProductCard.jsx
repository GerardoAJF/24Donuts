import React from "react";
import AddTags from "../../shared/AddTags/AddTags.jsx";
import donut from "../../../assets/donuts.png";
import "./ProductCard.css";

const ProductCard = ({ image, name, description, price, tags, onEdit, onDelete, onRemoveTag, onOpenAddTag }) => {
    return (
        <div className="product-card">
            <div className="product-card__image-wrap">
                <img
                    className="product-card__image"
                    src={image || donut}
                    alt={name}
                    onError={(e) => { e.target.src = donut; }}
                />
            </div>

            <div className="product-card__content">
                <div className="product-card__header">
                    <h2 className="product-card__name">{name}</h2>
                    <div className="product-card__actions">
                        <button className="product-card__btn product-card__btn--edit" onClick={onEdit} title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button className="product-card__btn product-card__btn--delete" onClick={onDelete} title="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>

                <div className="product-card__body">
                    {description && (
                        <p className="product-card__description">{description}</p>
                    )}
                    <AddTags tags={tags} onRemove={onRemoveTag} onOpenAdd={onOpenAddTag} />
                    <span className="product-card__price">${price} c/u</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
