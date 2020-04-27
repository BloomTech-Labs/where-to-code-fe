// Imports
/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";

// Import React Script Library to load Google object
import MapCards from "./MapCards";

import styled from "styled-components";
import FilteredMapCards from "./FilteredMapCards";
import Search from "./Search";

class Map extends Component {
  constructor(props) {
    super(props);
    this.searchButton = React.createRef();

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
      this.initialMapRender();
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
            let map = new google.maps.Map(document.getElementById("map"), {
              center: this.state.pos,
              zoom: 15
            });
          },
          () => {
            // If user denies geolocation info, default location is used
            this.handleLocationError();
          }
        );
      } // To disable any eslint 'google not defined' errors
    }

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
    );

    // Sets autocomplete fields to be returned
    this.autocomplete.setFields([
      "address_components",
      "formatted_address",
      "geometry",
      "icon",
      "name",
      "place_id"
    ]);

    // When a new place is selected the map will be forced to update
    this.autocomplete.addListener("place_changed", this.handleMapChange);

    this.searchButton.current.addEventListener("click", this.handleMapChange);
  }

  handleLocationError = (browserHasGeolocation = false) => {
    // Set default location to Sydney, Australia
    let pos = { lat: -33.856, lng: 151.215 };

    let map = new google.maps.Map(document.getElementById("map"), {
      center: pos,
      zoom: 15
    });
  };

  initialMapRender = () => {
    this.handleMapChange(this.state.initialPlace);
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleMapChange = initialPlace => {
    // Get map object
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16
    });

    // Gets new place when auto complete search is clicked
    let place = initialPlace || this.autocomplete.getPlace();

    // request object sets search query, search radius, and coordinates
    let request = {
      location: place.geometry.location,
      id: place.place_id,
      rating: place.rating,
      icon: place.icon,
      photos: place.photos,
      radius: "500",
      query: this.state.query || "cafe"
    };

    // requests use of PlaceService
    let service = new google.maps.places.PlacesService(map);

    // Sets map screen to new location based on lat and lng
    map.setCenter(place.geometry.location);
    // Sets marker to lat/lng position

    // Resets state when a new location is clicked
    if (this.state.locations.name !== "") {
      this.setState({ locations: [], locationsFilter: [] });
    }

    // cb function that returns place results
    let callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let bounds = new google.maps.LatLngBounds();

        results.map(place => {
          // Adds map markers to nearby locations
          let marker = new google.maps.Marker({
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
            map.setZoom(18);

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
                geocoder: google.maps.Geocoder,
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

  handleFocus = event => event.target.select();

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
          handleFocus={this.handleFocus}
          searchButton={this.searchButton}
          filterResults={this.filterResults}
        />
        <MapCardContainer>
          <CardContainer>
            {!this.state.filterBool ? (
              <MapCards locations={this.state.locations} />
            ) : (
              <FilteredMapCards locationsFilter={this.state.locationsFilter} />
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

export default connect(({ mapReducer: { place } }) => ({ place }), null)(Map);

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
