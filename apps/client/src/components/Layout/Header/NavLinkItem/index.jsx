import { Link } from "react-router-dom";

const NavLinkItem = ({ name, path, selected }) => {
  return (
    <li>
      <Link
        to={path}
        className={`block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white ${
          selected ? "md:text-blue-700" : "md:text-black"
        }`}
        aria-current="page"
      >
        {name}
      </Link>
    </li>
  );
};

export default NavLinkItem;
