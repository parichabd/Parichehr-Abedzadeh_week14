import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

import styles from "./Nav.module.css";
function Nav() {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.navbarHead}>
        <FontAwesomeIcon icon={faUserSecret} size="1x" color="#FDDA1D" />
        Contact <span className={styles.navbarHeadColor}>Manager</span>
      </h1>
    </div>
  );
}

export default Nav;
