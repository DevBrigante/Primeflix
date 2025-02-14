import { Link } from "react-router-dom";




export function Favorites(){
    return(
        <div className="sm: mt-90 px-2 text-center flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl">EM DESENVOLVIMENTO</h1>
            <span className="mt-2 font-medium">Retorne para página inicial...</span>
            <Link to="/" className="bg-gray-600 w-30 text-center py-2 font-medium cursor-pointer mt-4 rounded-2xl text-white">Home</Link>
        </div>
    )
}