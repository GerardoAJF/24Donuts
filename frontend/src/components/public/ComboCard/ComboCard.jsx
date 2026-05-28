import BotonPrimario from "../../shared/Boton/Boton";
import "./ComboCard.css";

function ComboCard({ image, name, items = [] }) {
  return (
    <div className="combo-card">
      <img className="combo-card-image" src={image} alt={name} />
      <div className="combo-card-body">
        <h3 className="combo-card-name">{name}</h3>
        <ul className="combo-card-items">
          {items.map((item, i) => (
            <li key={i} className="combo-card-item">{item}</li>
          ))}
        </ul>
        <BotonPrimario>Agregar</BotonPrimario>
      </div>
    </div>
  );
}

export default ComboCard;
