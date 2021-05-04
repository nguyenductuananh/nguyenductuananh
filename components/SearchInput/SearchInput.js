import React from "react";
import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";
function SearchInput(props) {
  return (
    <div className={styles.wrapper}>
      <SearchRounded />
      <input className={styles.input} {...props} />
    </div>
  );
}

export default SearchInput;
