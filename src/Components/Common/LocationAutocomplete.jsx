import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { googleSearchPlaceKey } from "../../Config/authConfig";

const LocationAutocomplete = ({
  onSelect,
  field,
  placeholder = "City or country",
  setValue,
}) => {
  //  const {setValue} = useForm();
  useEffect(() => {
    setLocation(null);
  }, []);
  const [location, setLocation] = useState(null);
  const handlePlaceSelect = (place) => {
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      onSelect(place?.formatted_address, { lat, lng });
      setLocation(lat);
    }
  };
  const handleOnBlur = () => {
    // setLocation({ location: searchedText, lat: null, long: null })
    if (!location) {
      setValue(field?.name, "");
      setLocation("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!location) {
        setValue(field?.name, "");
      }
    }
  };
  return (
    <Autocomplete 
      {...field}
      apiKey={googleSearchPlaceKey}
      onPlaceSelected={(place) => {
        handlePlaceSelect(place);
        field.onChange(place?.formatted_address);
      }}
      onChange={(event) => {
        field.onChange(event.target.value);
        if (event.target.value === "") {
          setLocation(null);
        }
      }}
      onBlur={handleOnBlur}
      types={["(regions)"]}
      placeholder={placeholder}
      onKeyDown={(e) => {
        handleKeyPress(e);
      }}
      // componentRestrictions={{ country: "us" }} // Restrict results to a specific country if needed
    />
  );
};

export default LocationAutocomplete;
