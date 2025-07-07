import React, { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-black bg-[linear-gradient(120deg,#fdfbfb_0%,#ebedee_100%)]">
      <div className="mx-auto max-w-7xl w-full lg:flex py-4 px-4 sm:px-8">
        <div className="flex flex-wrap flex-1 lg:flex-none justify-between">
          <a className="inline-block py-1 mr-4 text-xl whitespace-no-wrap" href="#">
            Luis Sanchez
          </a>

          <button 
            className="lg:hidden inline-flex py-1 px-3 text-md leading-normal bg-transparent border border-gray-400 rounded" 
            type="button" 
            aria-controls="navbarNav" 
            aria-expanded={isMenuOpen} 
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                <path stroke="rgba(0, 0, 0, 0.5)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"/>
              </svg>
            </span>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex flex-grow`}>
          <ul className="lg:flex flex-wrap list-reset pl-0 mb-0 w-full">
            <li>
              <a className="no-underline py-2 lg:px-4 inline-block" href="#home">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li>
              <a className="no-underline py-2 lg:px-4 inline-block" href="#testimonials">
                Testimonials
              </a>
            </li>
            <li>
              <a className="no-underline py-2 lg:px-4 inline-block" href="#contact">
                Contact
              </a>
            </li>
            <li>
              <a className="no-underline py-2 lg:px-4 inline-block" href="https://blog.luisfelipesanchez.me">
                Blog
              </a>
            </li>
            <li className="ml-auto">
              <a className="no-underline py-2 lg:py-0 px-0 inline-block text-2xl" href="https://github.com/dceluis" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;