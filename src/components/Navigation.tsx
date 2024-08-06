import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
      <span className="font-bold">React Daria</span>
      <span>
        <Link to="/" className="mr-8">
          Products
        </Link>
        <Link to="/about" className="mr-8">
          About
        </Link>
      </span>
    </nav>
  );
}
