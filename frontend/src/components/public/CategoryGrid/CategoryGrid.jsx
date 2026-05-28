import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryGrid.css";

function CategoryGrid({ categories = [] }) {
  return (
    <div className="category-grid">
      {categories.map((category, i) => (
        <CategoryCard
          key={i}
          image={category.image}
          title={category.title}
          description={category.description}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;
