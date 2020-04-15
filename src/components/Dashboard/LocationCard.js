import React from "react";

const LocationCard = ({ location }) => (
  <section className="location-listing">
    <section>
      <b>{location.name}</b>
      <br />
      <span>{location.address}</span>
    </section>
    <p>
      <i className="fas fa-heart"></i>
    </p>
  </section>
);

export default LocationCard;
