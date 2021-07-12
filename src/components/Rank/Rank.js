import React from 'react';

const Rank = ({ user }) => {
  const { name, entries } = user;

  return (
    <div>
      <div className="dark-pink f3">{name}, your current entry count is...</div>
      <div className="dark-pink f1">{entries}</div>
    </div>
  );
};

export default Rank;
