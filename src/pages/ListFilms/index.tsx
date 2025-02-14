import { useEffect, useState } from "react";
import { MoviesProps } from "../Home"
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";



export function ListFilms(){

    const navigate = useNavigate();
    const { id } = useParams();
    const [movies, setMovies] = useState<MoviesProps>();
    const [position, setPosition] = useState({ x: 0, y: 0})

    useEffect(()=>{
        let isMounted = true

        async function loadMovies(){
            try{
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "10c61cf842a1dade1b2e54aee578d723",
                        language: "pt-BR"
                    }
                })
                
                if(isMounted){
                    setMovies(response.data)
                }
                

            } catch(error){
                console.log("Erro ao buscar details", error)
                navigate("/", {replace: true})
                return;
            }

        }

        loadMovies();

        return () => {
            isMounted = false
        }

    }, [id, navigate])

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>){
        const {clientX, clientY, currentTarget} = event
        const {left, top, width, height} = currentTarget.getBoundingClientRect();

        const x = ((clientX - left) / width - 0.5) * 20;
        const y = ((clientY - top) / height - 0.5) * 20;

        setPosition({ x, y})
    }

    function handleMouseLeave(){
        setPosition({ x: 0, y: 0})
    }

    return(
        <div className="flex flex-col justify-center items-center m-3">
            <h1 className="mb-3 text-2xl font-bold my-15">Título: {movies?.title}</h1>
            <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
               <img src={`https://image.tmdb.org/t/p/original/${movies?.backdrop_path}`} alt={movies?.title} 
                className="sm: mx-auto w-full h-auto object-cover transition-transform duration-200 rounded-2xl brightness-50"
                style={{
                    transform: `scale(1.1) translate(${position.x}px, ${position.y}px)`,
                }} />
            </div>

            
            <span className="w-full max-w-3xl my-4 font-serif text-lg/6"><strong>Sinopse: </strong>{movies?.overview}</span>
            <span className="w-full max-w-3xl text-lg/6 font-bold -mt-2">Avaliação: {movies?.vote_average?.toFixed(0)}/10</span>
        </div>
    )
}