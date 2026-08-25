import "../../ComponentStyle/SubcomponentStyle/Marquee.css";

export default function Marquee({ itemsList }) {
  return (
    <div className="Marquee">
      <div className="MarqueeTrack">
        <div className="MarqueeCards">{itemsList}</div>
        <div className="MarqueeCards" aria-hidden="true">{itemsList}</div>
      </div>
    </div>
  );
}