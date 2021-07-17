import React from 'react';

const Rank = ({ user }) => {
  const { name, entries } = user;

  return (
    <div className="main-section">
      <div className="dark-pink f4">{name}, your current entry count is...</div>
      <div className="dark-pink f3">{entries}</div>
    </div>
  );
};

export default Rank;
