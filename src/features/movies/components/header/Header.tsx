import { useCallback, useState } from "react";
import styles from "./Header.module.scss";
import { debounce } from "../../../../utils";

interface HeaderProps {
  title: string;
  onBackClick: () => void;
  onSearch: (query: string, open: boolean) => void;
  backIcon: string;
  searchIcon: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  onBackClick,
  onSearch,
  backIcon,
  searchIcon,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // handles debounce technique
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query, showSearch);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className={styles.container}>
      {showSearch ? (
        <div className={styles.searchContainer}>
          <input
            className={styles.searchBar}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className={styles.closeBtn}
            onClick={() => {
              setShowSearch(false);
              setSearchQuery("");
              onSearch("", false);
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className={styles.headerItem} onClick={onBackClick}>
            <img src={backIcon} width={24} alt="" />
          </div>
          <div className={styles.title}>{title}</div>
          <div
            className={styles.headerItem}
            onClick={() => {
              setShowSearch(true);
              onSearch("", true);
            }}
          >
            <img src={searchIcon} width={24} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
