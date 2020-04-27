// Imports
/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePlace, updateMap } from "../Redux/actions";

// Import React Script Library to load Google object
import MapCards from "./MapCards";

import styled from "styled-components";
import Search from "./Search";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPlace: this.props.place,
      locations: [],
      locationsFilter: [],
      filterBool: false,
      pos: {
        lat: 0,
        lng: 0
      },
      details: [],
      query: "",
      locationCoords: []
    };
  }

  componentDidMount() {
    // Try HTML5 Geolocation
    if (this.state.initialPlace) {
      this.handleMapChange();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            localStorage.setItem("lat", position.coords.latitude);
            localStorage.setItem("lng", position.coords.longitude);
            this.setState({
              pos: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
            // Loads map
            const map = new google.maps.Map(document.getElementById("map"), {
              center: this.state.pos,
              zoom: 15
            });
            this.props.updateMap(map);
          },
          () => {
            // If user denies geolocation info, default location is used
            this.handleLocationError();
          }
        );
      } // To disable any eslint 'google not defined' errors
    }
  }

  handleLocationError = (browserHasGeolocation = false) => {
    // Set default location to Sydney, Australia
    const pos = { lat: -33.856, lng: 151.215 };

    const map = new google.maps.Map(document.getElementById("map"), {
      center: pos,
      zoom: 15
    });
    this.props.updateMap(map);
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleMapChange = () => {
    // Gets new place when auto complete search is clicked
    const place = this.props.place;
    if (!place.place_id) return;

    // request object sets search query, search radius, and coordinates
    const request = {
      location: place.geometry.location,
      id: place.place_id,
      rating: place.rating,
      icon: place.icon,
      photos: place.photos,
      radius: "500",
      query: this.state.query || "cafe"
    };

    // Get map object
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16
    });
    this.props.updateMap(map);

    // requests use of PlaceService
    const service = new google.maps.places.PlacesService(map);

    // Sets map screen to new location based on lat and lng
    map.setCenter(place.geometry.location);
    // Sets marker to lat/lng position

    // Resets state when a new location is clicked
    if (this.state.locations.name !== "") {
      this.setState({ locations: [], locationsFilter: [] });
    }

    // cb function that returns place results
    const callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const bounds = new google.maps.LatLngBounds();

        results.map(place => {
          // Adds map markers to nearby locations
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name
          });

          bounds.extend(marker.getPosition());

          const infoWindow = new google.maps.InfoWindow({
            content: `
            <b>${place.name}</b>
            <address>
            ${place.formatted_address}
            </address>
            `
          });

          marker.addListener("click", () => {
            google.maps.event.addListener(map, "click", event => {
              infoWindow.close();
            });

            // Scroll to location card
            const card = document.getElementById(`card-${place.place_id}`);
            card.scrollIntoView();

            // Move map to location
            map.setCenter(place.geometry.location);
            map.setZoom(16);

            infoWindow.open(map, marker);
          });

          marker.setVisible(true);
          map.fitBounds(bounds);
          map.setCenter(bounds.getCenter());

          this.setState({
            locations: [
              ...this.state.locations,
              {
                name: place.name,
                icon: !place.photos // Loads an img if it has one, if not it uses default google icon
                  ? place.icon
                  : place.photos[0].getUrl({
                      maxWidth: 300
                    }),
                id: place.place_id,
                address: place.formatted_address,
                rating: place.rating,
                infoWindow: infoWindow,
                position: place.geometry.location,
                marker: marker
              }
            ]
          });
        });
      }
    };
    // PlaceService has the `textSearch` method
    service.textSearch(request, callback);
  };

  filterResults = () => {
    if (this.state.filterBool === true) {
      this.setState({ filterBool: false });
    } else {
      this.setState({ filterBool: true });
    }

    if (this.state.locationsFilter.length > 0) {
      return;
    } else {
      this.state.locations.map(place => {
        if (place.rating >= 4) {
          this.setState(prevState => ({
            locationsFilter: [...prevState.locationsFilter, place]
          }));
        }
      });
    }
  };

  render() {
    return (
      <HomeContainer>
        <Search
          state={this.state}
          handleInputChange={this.handleInputChange}
          filterResults={this.filterResults}
          updatePlace={this.props.updatePlace}
          handleMapChange={this.handleMapChange}
        />
        <MapCardContainer>
          <CardContainer>
            {!this.state.filterBool ? (
              <MapCards locations={this.state.locations} />
            ) : (
              <MapCards locations={this.state.locationsFilter} />
            )}
          </CardContainer>
          <MapContainer
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <GMap
              id="map"
              style={{
                height: "800px",
                width: "100%"
              }}
            ></GMap>

            {/* I used an empty div for the map object in the requestDetails function, this is a strange work around. If I use the actual map it reloads and we lose the position and markers. */}
            <div id="fakeMap"></div>
          </MapContainer>
        </MapCardContainer>
      </HomeContainer>
    );
  }
}

export default connect(({ mapReducer: { place } }) => ({ place }), {
  updatePlace,
  updateMap
})(Map);

const MapCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 600;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;
    align-items: center;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const MapContainer = styled.div`
  width: 100%;
  margin: 0px 10px;
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  padding: 0 1rem;
  height: 800px;
  max-width: 600px;

  @media (max-width: 768px) {
    margin: 20px 0 0 0;
  }

  @media (max-width: 411px) {
    width: 300px;
  }
`;

const GMap = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    height: 600px !important;
  }
`;
