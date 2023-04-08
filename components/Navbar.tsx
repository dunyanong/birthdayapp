import Link from "next/link";
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white fixed bg-opacity-50 backdrop-blur-lg py-3 px-10 md:px-20 w-full mx-auto z-50">
      <div className="items-center flex justify-between gap-10 py-2">

        <div className="hover:cursor">
          <a href="https://github.com/dunyanong/birthdayapp" target="_blank" rel="noopener noreferrer" className="text-black text-3xl flex items-center transition-colors duration-200 hover:text-green-600">
            <FaGithub className="mr-2" />
          </a>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div className="text-sm md:text-base font-semibold">
              <Link href="/" legacyBehavior>
              <a className="text-black transition-colors duration-200 hover:text-green-600">Home</a>
              </Link>
          </div>
          <div className="text-sm md:text-base font-semibold">
              <Link href="/about" legacyBehavior>
              <a className="text-black transition-colors duration-200 hover:text-green-600">About</a>
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;