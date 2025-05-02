import { useState } from "react";
import { OutlineKeyboardArrowDown } from "../icon/arrowIcon";
import "./Header.scss";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Fonction pour ouvrir le menu burger
  const handleOpenBurgerMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        {/* Titre principale */}
        <div className="titleSide">
          <h1 className="headerTitle">StockOps</h1>
        </div>
        {/* Boutton du menu burger visible seulement en format mobile */}
        <button
          className="burgerMenuButton"
          type="button"
          onClick={handleOpenBurgerMenu}
        >
          <div className="separator" />
          <div className="arrow">
            <OutlineKeyboardArrowDown />
          </div>
        </button>
      </header>
       {/* Navigation caché en format mobile dépliable avec le burgerMenuButton */}
       {menuIsOpen ? (
          <div className="navSide">
            <nav className="headerNav">
              <ul className="headerNavList">
                <li className="headerNavList__item">Dashboard</li>
                <li className="headerNavList__item">Login</li>
                <li className="headerNavList__item">Register</li>
              </ul>
            </nav>
          </div>
        ) : (
          ""
        )}
    </>
  );
}

export default Header;
