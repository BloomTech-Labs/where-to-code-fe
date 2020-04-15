import React from "react";
import LocationCard from "./LocationCard";

const SavedLocations = props => {
  const { savedLocations } = props;
  return (
    <>
      <p className="sub-header">Saved Locations</p>
      { savedLocations.map(location => <LocationCard location={location} />)}
    </>
  );
};

export default SavedLocations;
