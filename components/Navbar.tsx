import Link from "next/link";
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-black fixed bg-opacity-50 backdrop-blur-lg py-3 px-10 md:px-20 w-full mx-auto z-50">
      <div className="items-center flex justify-between gap-10 py-2">

        <div className="hover:cursor">
            <Link href="/" legacyBehavior>
                <a className="font-medium text-2xl text-white tracking-tighter transition-colors duration-200 hover:text-yellow-400">BD Reminder</a>
            </Link>
        </div>

        <div className="flex gap-4 justify-center items-center">
            <div className="text-sm md:text-base font-semibold">
                <Link href="/" legacyBehavior>
                <a className="text-white transition-colors duration-200 hover:text-yellow-400">Home</a>
                </Link>
            </div>
            <div className="text-sm md:text-base font-semibold">
                <a href="https://github.com/dunyanong/Next-13-Movie-App" target="_blank" rel="noopener noreferrer" className="text-white flex items-center transition-colors duration-200 hover:text-yellow-400">
                <FaGithub className="mr-2" />
                GitHub
                </a>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;