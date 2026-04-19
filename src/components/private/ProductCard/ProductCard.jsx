// ProductCard.jsx
import React from "react";
import AddTags from "../AddTags/AddTags.jsx";
import "./ProductCard.css";

const ProductCard = ({ image, name, description, price, tags, onEdit, onDelete, onRemoveTag, onOpenAddTag }) => {
    return (
        <div className="product-card">
            <img className="product-card__image" src={image} alt={name} />

            <div className="product-card__content">
                <div className="product-card__header">
                    <h2 className="product-card__name">{name}</h2>
                    <div className="product-card__actions">
                        <button className="product-card__btn" onClick={onEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                        </button>
                        <button className="product-card__btn" onClick={onDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </button>
                    </div>
                </div>
                <div className="product-card__body">
                    <AddTags tags={tags} onRemove={onRemoveTag} onOpenAdd={onOpenAddTag} />

                    <p className="product-card__description">{description}</p>

                    <span className="product-card__price">Precio: ${price} c/u</span>
                </div>
            </div>
        </div>
    );
};

/*
    const [tags, setTags] = useState([{
        id: "01",
        label: "Bajo en grasas",
        backgroundColor: "#C0DD97",
        textColor: "#27500A"
    },
    {
        id: "02",
        label: "Bajo en grasas",
        backgroundColor: "#C0DD97",
        textColor: "#27500A"
    }]);
    const handleRemove = (id) => setTags(tags.filter((t) => t.id !== id));
  return (
      <ProductCard
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOUpS4rNBK4eElgwGsHe3_NK-upEaN7rCvNQ&s"
          name="Donas horneadas"
          description="Donas horneadas bien buenas bien sabrosas para disfrutar a cualquier hora"
          price="2"
          tags={tags}
          onEdit={() => console.log("edit")}
          onDelete={() => console.log("delete")}
          onRemoveTag={handleRemove}
          onOpenAddTag={() => console.log("agregar etiqueta")}
      />
*/

export default ProductCard;