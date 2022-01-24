import { NAVIGATION_ITEMS } from "../../../../constants";
import NavLinkItem from "../NavLinkItem";

const NavLinks = () => {
  return (
    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {NAVIGATION_ITEMS.map(item => (
          <NavLinkItem key={item.name} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
