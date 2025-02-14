import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, FormEvent } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";


export interface MoviesProps{
    id: string;
    overview: string;
    poster_path: string;
    title: string;
    backdrop_path: string;
    page: number;
    genres: string;
    vote_average: number;

}

export function Home(){

    const [input, setInput] = useState("")
    const [movies, setMovies] = useState<MoviesProps[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(false)
    const navigate = useNavigate()


    useEffect(()=>{
        loadingMovies()
    }, [])

    async function loadingMovies(){
        const response = await api.get("movie/popular", {
            params: {
                api_key: "10c61cf842a1dade1b2e54aee578d723",
                language: "pt-BR",
                page: 1
                
            }
        })
        const data = response.data.results
        setMovies(data)
        setLoading(false)
        setSearch(false)

    }
    

    async function handleRegisterInput(e: FormEvent){
        e.preventDefault();

        if(!input.trim()) return;

        try{
            const response = await api.get("search/movie", {
                params: {
                    api_key: "10c61cf842a1dade1b2e54aee578d723",
                    language: "pt-BR",
                    query: input,
                    page: 1
                }
            })

            if(response.data.results.length === 0){
                console.log("Filme não encontrado")
                navigate("/", {replace: true})
            }

            setMovies(response.data.results)
            setSearch(true);



        } catch(error){
            console.error(`Erro ao buscar o filme: ${error}`)
        }
    }


    if(loading){
        return(
            <div className="flex justify-center mx-auto">
                <h1 className="my-50 font-bold text-2xl">Carregando os filmes, aguarde...</h1>
            </div>
        )
    }



    return(
        <main className="my-3 max-w-7xl mx-auto">
        <form className="sm: mx-3 flex items-center p-1 bg-gray-100 rounded-2xl gap-3"
        onSubmit={handleRegisterInput}>
            <button type="submit" className="p-2 cursor-pointer">
                <IoIosSearch size={18}/>
            </button>
            <input className="w-2xs outline-none h-10 rounded px-2 bg-transparent" type="text"
            placeholder="Busque por um filme popular..."
            onChange={(e)=> setInput(e.target.value)} 
            value={input}/>
        </form>

        <h1 className="text-center my-3 text-3xl font-bold">Filmes Populares no momento</h1>


        <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-4 gap-6 mt-5">
            {movies.map((movie)=>(
                <section key={movie.id} className="w-full">
                    <Link to={`/details/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} 
                        className="sm: w-3xs mx-auto rounded-lg h-96 object-cover block transition-transform duration-300 hover:scale-105
                        brightness-50" />
                        <strong className="block text-center text-xl mt-2">{movie.title}</strong>
                    </Link>

                </section>
            ))}
        </div>
        {search && (
            <button onClick={loadingMovies} className="flex justify-center items-center mx-auto mt-3 cursor-pointer text-white font-medium bg-gray-700 rounded-lg p-2">Voltar para página inicial</button>
        )}
    </main>
    )
}