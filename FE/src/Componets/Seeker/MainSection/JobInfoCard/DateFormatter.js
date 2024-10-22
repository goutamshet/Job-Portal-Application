import React from 'react';

const DateFormatter = ({className, dateString, title }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={className}>
      {title} : {formatDate(dateString)}
    </div>
  );
};

export default DateFormatter;
