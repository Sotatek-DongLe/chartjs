import './TooltipComponent.scss';

const TooltipComponent = ({ titleLines, bodyLines }) => {
  return (
    <div className="tooltip">
      {titleLines.map((line, index) => (
        <h2 key={index}>{line}</h2>
      ))}
      {bodyLines.map((line, index) => (
        <span key={index}>${line}</span>
      ))}
    </div>
  );
};

export default TooltipComponent;
