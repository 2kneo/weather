import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { url } from "../../service/Service";
import "./Search.css";

const Search = ({ searchData, loadingFn }) => {
  const [address, setAddress] = useState("");

  const urlSearch = (place) => {
    if (!place.hasOwnProperty("address_components")) {
      alert("На выбраный город данные о погоде отсуствуют");
      return false;
    }
    loadingFn(true);
    url(place.address_components[0].short_name).then((result) => {
      if (+result.cod === 200) {
        setAddress("");
        searchData(result);
      } else {
        alert(`Error: ${result.message}`);
      }
      loadingFn(false);
    });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => urlSearch(results[0]))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="search">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        shouldFetchSuggestions={address.length > 1}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Поиск",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#d7d7d7", cursor: "pointer" }
                  : { backgroundColor: "#e7e7e7", cursor: "pointer" };
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Search;
