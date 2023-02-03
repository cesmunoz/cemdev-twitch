import Link from "next/link";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Histories", href: "/histories" },
  { label: "Requests", href: "/requests" },
  { label: "Commands", href: "/commands" },
];

const NavBar = () => {
  // create a navbar with links to the pages and a logo with tailwind
  return (
    <nav className="bg-gray-800 p-5">
      <div className="flex gap-5 place-content-center">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <span className="text-white text-lg font-bold">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
