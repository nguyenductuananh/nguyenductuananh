import styles from "./CountryItem.module.css";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
CountryItem.propTypes = {};

function CountryItem(props) {
  const { country } = props;
  const router = useRouter();
  return (
    <Link href="/country/[code]" as={`/country/${country.alpha3Code}`}>
      <div className={styles.wrapper}>
        <div className={styles.country_name}>{country.name}</div>
        <div className={styles.population}>{country.population}</div>
      </div>
    </Link>
  );
}

export default CountryItem;
