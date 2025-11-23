import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ExpertiseCell = ({ topics = [] }) => {
  if (!topics || topics.length === 0) {
    return <span className="text-gray-400">-</span>;
  }

  const visibleTopics = topics.slice(0, 2);
  const remainingCount = topics.length - 2;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div className="text-left">
        {topics.map((topic, index) => (
          <div key={index}>{topic}</div>
        ))}
      </div>
    </Tooltip>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visibleTopics.map((topic, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700"
        >
          {topic}
        </span>
      ))}
      {remainingCount > 0 && (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
          <span className="inline-flex cursor-help items-center rounded-md border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200">
            +{remainingCount}
          </span>
        </OverlayTrigger>
      )}
    </div>
  );
};

export default ExpertiseCell;
