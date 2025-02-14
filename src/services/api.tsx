// https://api.themoviedb.org/3/movie/popular?api_key=10c61cf842a1dade1b2e54aee578d723&language=pt-BR&page=1

import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})