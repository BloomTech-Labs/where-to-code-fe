import React from "react";
import LocationCard from "./LocationCard";

const SavedLocations = props => {
  const { savedLocations } = props;
  return (
    <>
      <p className="sub-header">Saved Locations</p>
      {savedLocations.map(location => (
        <LocationCard
          key={`saved-location-${location.id}`}
          location={location}
          saved
        />
      ))}
    </>
  );
};

export default SavedLocations;
