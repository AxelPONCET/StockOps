import { OutlineKeyboardArrowDown } from "../icon/arrowIcon";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      {/* Titre principale */}
      <div className="titleSide">
        <h1 className="headerTitle">StockOps</h1>
      </div>
      {/* Navigation caché en format mobile dépliable avec le burgerMenuButton */}
      <div className="navSide">
        <nav className="headerNav">
          <ul className="headerNavList">
            <li className="headerNavList__item">Dashboard</li>
            <li className="headerNavList__item">Login</li>
            <li className="headerNavList__item">Register</li>
          </ul>
        </nav>
      </div>
      {/* Boutton du menu burger visible seulement en format mobile */}
      <div className="burgerMenuButton">
        <div className="separator" />
        <div className="arrow">
          <OutlineKeyboardArrowDown />
        </div>
      </div>
    </header>
  );
}

export default Header;
