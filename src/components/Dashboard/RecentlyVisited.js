import React from "react";
import LocationCard from "./LocationCard";

const RecentlyVisited = props => {
  const { visits } = props;

  return (
    <>
      <p className="sub-header">Recently Visited</p>
      {visits.map(visit => (
        <LocationCard key={`user-visit-${visit.id}`} visit={visit} />
      ))}
    </>
  );
};

export default RecentlyVisited;
