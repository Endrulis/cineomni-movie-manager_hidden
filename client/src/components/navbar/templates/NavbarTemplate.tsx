import React from 'react';
import { Link } from 'react-router-dom';
import { MobileMenu } from '../mobile/MobileMenu';

interface NavbarProps {
  isMenuOpen: boolean;
  handleMenuClick: () => void;
  navLinks: { text: string; to: string }[];
}

export const NavbarTemplate: React.FC<NavbarProps> = ({
  isMenuOpen,
  handleMenuClick,
  navLinks,
}) => {
  return (
    <div>
      <nav className="z-20 w-full flex justify-between items-center fixed top-0 left-0 right-0 py-3 px-8 bg-gray-800">
        <div className="ml-12">
          <Link
            to="/"
            className="text-2xl uppercase text-gray-200 hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out"
          >
            Cineomni
          </Link>
        </div>
        <ul className="flex-1 justify-center items-center hidden md:flex">
          {navLinks.map(({ text, to }) => (
            <li className="mx-4 cursor-pointer" key={`link-${to}`}>
              <Link
                to={to}
                className="uppercase text-xl text-gray-200 hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <MobileMenu
          isMenuOpen={isMenuOpen}
          handleMenuClick={handleMenuClick}
          navLinks={navLinks}
        />
      </nav>
    </div>
  );
};
