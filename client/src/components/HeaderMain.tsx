import logoTrelloFull from "../assets/logos/trello-logo-full.png.png";
import iconSearch from "../assets/icons/icon_search.png";
import iconNavi from "../assets/icons/icon_navi.png";

type HeaderMainProps = {
  onOpenSidebar: () => void;
};

export default function HeaderMain({ onOpenSidebar }: HeaderMainProps) {
  return (
    <header className="headerMain">
      <div className="headerSidebar">
        <img className="logoTrello" src={logoTrelloFull} alt="Trello Logo" />
      </div>
      <div className="headerDashboards">
        <div className="mediaHeaderBoard">
          <div className="searchDashboard">
            <img
              className="searchDashboardIcon"
              src={iconSearch}
              alt="search"
            />
          </div>
          <div className="listDashboardMedia" onClick={onOpenSidebar}>
            <img className="listDashboardMediaIcon" src={iconNavi} alt="menu" />
          </div>
        </div>
      </div>
    </header>
  );
}
