import React from "react";
import LocationCard from "./LocationCard";

const RecentlyVisited = props => {
  const { visits } = props;

  return (
    <>
      <p className="sub-header">Recently Visited</p>
      {visits.map(visit => (
        <LocationCard visit={visit} />
      ))}
    </>
  );
};

export default RecentlyVisited;
