import React from "react";
import moment from "moment";

const LocationCard = ({ location, saved, visit }) => {
  const { name, address } = location || visit.location;
  return (
    <section className="location-listing">
      <section>
        <b>{name}</b>
        <br />
        <span>{address}</span>
        <br />
      </section>
      <p>
        {!!saved ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="fas fa-long-arrow-alt-right"></i>
        )}
      </p>
    </section>
  );
};

export default LocationCard;
