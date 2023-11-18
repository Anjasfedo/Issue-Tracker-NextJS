import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links: { label: string; href: string }[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-5 h-10 px-5 mb-12 border-b">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
