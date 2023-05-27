import React from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

interface MobileMenuProps {
  isMenuOpen: boolean;
  handleMenuClick: () => void;
  navLinks: { text: string; to: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  handleMenuClick,
  navLinks,
}) => {
  return (
    <div className="flex md:hidden justify-center items-center w-9 h-9 rounded-full bg-blue-800">
      <HiMenuAlt4
        className="w-2/3 h-2/3 text-white cursor-pointer"
        onClick={() => handleMenuClick()}
      />
      {isMenuOpen && (
        <div
          className="flex justify-end items-end flex-col fixed top-0 bottom-0 right-0 h-screen z-20 p-4 w-2/3 shadow-lg bg-gray-800"
          style={{ transition: 'all 0.85s ease-out' }}
        >
          <HiX
            className="w-9 h-9 text-blue-500 my-2 mx-4 cursor-pointer"
            onClick={() => handleMenuClick()}
          />
          <ul className="h-full w-full flex justify-start items-start flex-col">
            {navLinks.map(({ text, to }) => (
              <li className="m-4" key={`link-${to}`}>
                <Link
                  to={`/${to}`}
                  className="uppercase text-base text-gray-200 hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out"
                  onClick={() => handleMenuClick()}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
