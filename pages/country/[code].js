import styles from "./Country.module.css";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
function Country(props) {
  const { country } = props;
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <img className={styles.flag} src={country.flag} />
            <h3>{country.name}</h3>
            <p>{country.region}</p>
          </div>
          <div className={styles.main_detail}>
            <div>
              <h3>{country.population}</h3>
              <p className={styles.container_keyword}>Population</p>
            </div>
            <div>
              <h3>{country.area}</h3>
              <p className={styles.container_keyword}>Area</p>
            </div>
          </div>
        </div>
        <div className={styles.detail}>
          <p className={styles.detail_keyword}>Capital</p>
          <p>{country.capital}</p>
          <p className={styles.detail_keyword}>Language</p>
          <p>{country.languages.map((lang) => lang.name).join(",")}</p>
          <p className={styles.detail_keyword}>Currencies</p>
          <p>{country.currencies[0].name}</p>
          <p className={styles.detail_keyword}>Native name</p>
          <p>{country.nativeName}</p>
          <p className={styles.detail_keyword}>Gini</p>
          <p>{country.gini}</p>
        </div>
        <Link href="/">Go back</Link>
      </div>
    </Layout>
  );
}

export default Country;
export const getStaticPaths = async () => {
  let url = "https://restcountries.eu/rest/v2/all";
  let res = await fetch(url);
  let countries = await res.json();
  let paths = countries.map((country) => {
    return { params: { code: country.alpha3Code } };
  });

  return { paths, fallback: false };
};
export const getStaticProps = async ({ params }) => {
  let code = params.code;
  let url = "https://restcountries.eu/rest/v2/alpha/";
  let res = await fetch(`${url}${code}`);
  let country = await res.json();
  return { props: { country } };
};
