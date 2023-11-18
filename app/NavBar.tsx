"use client"
import Link from "next/link";
import { AiFillBug } from 'react-icons/ai';

import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const links: { label: string; href: string }[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPage = usePathname();

  return (
    <nav className="flex space-x-5 h-20 px-5 mb-12 border-b items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={classNames({
                "hover:text-zinc-800 transition-colors": true,
                "text-zinc-500": item.href !== currentPage,
                "text-zinc-950": item.href === currentPage,
              })}
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
