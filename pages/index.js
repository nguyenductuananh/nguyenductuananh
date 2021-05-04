import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
import CountriesList from "../components/CountriesList/CountriesList";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { useEffect, useState } from "react";
export default function Home(props) {
  const { countries } = props;
  const [countriesList, setCountriesList] = useState(countries);
  const [inputValue, setInputValue] = useState("");
  const [direct, setDirect] = useState("");
  const sortByDirect = () => {
    let newCountriesList = [...countriesList];
    console.log(direct);
    if (!direct) {
      newCountriesList = newCountriesList.sort((a, b) =>
        a.population > b.population ? 1 : -1
      );
    } else if (direct === "desc") {
      newCountriesList = newCountriesList.sort((a, b) =>
        a.population > b.population ? -1 : 1
      );
    } else {
      newCountriesList = filterByName();
    }
    setCountriesList(newCountriesList);
    switchDirect();
  };
  const switchDirect = () => {
    if (!direct) setDirect("desc");
    else if (direct === "desc") setDirect("asc");
    else setDirect("");
  };
  const getKeyboardArrow = () => {
    if (direct === "asc") return <KeyboardArrowUp />;
    if (direct === "desc") return <KeyboardArrowDown />;
    return <></>;
  };
  const filterByName = () => {
    if (!inputValue) return countries;
    const newCountriesList = [...countries].filter((country) => {
      return (
        country.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        country.region.toLowerCase().includes(inputValue.toLowerCase()) ||
        country.subregion.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    return newCountriesList;
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  useEffect(() => {
    let list = filterByName();
    if (list) {
      setCountriesList(list);
    }
  }, [inputValue]);
  return (
    <Layout>
      <h3 className={styles.title}>{`Found ${countries.length} countries`}</h3>
      <SearchInput
        placeholder="Search by name, stage..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={styles.header}>
        <button className={styles.header_button} onClick={sortByDirect}>
          Name {getKeyboardArrow()}
        </button>
        <button className={styles.header_button} onClick={sortByDirect}>
          Population {getKeyboardArrow()}
        </button>
      </div>
      <CountriesList countries={countriesList} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  let url = "https://restcountries.eu/rest/v2/all";
  let res = await fetch(url);
  let countries = await res.json();
  return { props: { countries } };
};
