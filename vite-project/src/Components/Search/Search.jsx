import styles from "./Search.module.css";

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Search;
