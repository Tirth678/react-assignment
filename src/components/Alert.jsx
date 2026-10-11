import React from 'react';

const Alert = React.memo(({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>×</button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
