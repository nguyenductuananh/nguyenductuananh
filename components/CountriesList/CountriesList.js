import React from "react";
import Link from "next/link";
import CountryItem from "../CountryItem/CountryItem";

function CountriesList(props) {
  const { countries } = props;
  return (
    <div>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </div>
  );
}

export default CountriesList;
