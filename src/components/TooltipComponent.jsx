import './TooltipComponent.scss';

const TooltipComponent = ({ titleLines, bodyLines }) => {
  return (
    <div className="tooltip">
      {bodyLines.map((line, index) => (
        <h2 key={index}>{line && `$${line}`}</h2>
      ))}
      {titleLines.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
    </div>
  );
};

export default TooltipComponent;
