import "./Loader.css";

function Loader({ size = 32, text = "Processing..." }) {
  return (
    <div className="loader-wrapper">
      <div
        className="loader-spinner"
        style={{ width: size, height: size }}
      />
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
}

export default Loader;
