import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={() => setIsOpen(false)}></div>}
      <nav className={`fixed w-full bg-gray-800 p-2 mt-0 ${isOpen ? 'z-30' : ''}`}>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-between text-white font-extrabold">
            <a className="text-white no-underline hover:text-white hover:no-underline" href="#">
              <img className="w-8 h-8 mr-2 ml-2" src="https://www.svgrepo.com/show/414876/book-education-library-2.svg" alt="logo"/>
            </a>
            <button className="navbar-burger flex items-center text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
          <div className={`w-full md:w-1/2 block flex-grow md:flex md:items-center mt-2 md:mt-0 bg-gray-800 z-30 ${isOpen ? 'block visible' : 'hidden'}`} id="nav-content">
            <ul className="list-reset md:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Home</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">BookMarks</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Comics</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="/about">About us</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Login/Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
