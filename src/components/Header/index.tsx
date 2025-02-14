import { Link } from "react-router-dom";




export function Header(){

    return(
        <header className="w-full bg-sky-900 h-11 sticky z-20 inset-0">
            <div className="sm: px-10 max-w-7xl mx-auto flex justify-between text-white">
                <Link to="/" className="text-2xl p-auto mt-1 font-bold hover:text-gray-300 transition duration-100 ease-in-out">Primeflix</Link>
                <Link to="/favorites" className="px-5 my-3 rounded-0 rounded bg-sky-700 hover:bg-sky-500 transition duration-500 ease-in-out italic font-medium">Favoritados</Link>
            </div>
        </header>
    )
}