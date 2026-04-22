import "./HeroBanner.css";

function HeroBanner({ image, title, description }) {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-banner-overlay" />
      <div className="hero-banner-content">
        <h1 className="hero-banner-title">{title}</h1>
        <p className="hero-banner-description">{description}</p>
      </div>
    </div>
  );
}

export default HeroBanner;
