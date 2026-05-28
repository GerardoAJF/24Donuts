import "./CategoryCard.css";

function CategoryCard({ image, title, description }) {
  return (
    <div className="category-card">
      <h3 className="category-card-title">{title}</h3>
      <p className="category-card-description">{description}</p>
      <img className="category-card-image" src={image} alt={title} />
    </div>
  );
}

export default CategoryCard;
