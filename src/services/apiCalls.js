import axios from "axios"


export const getBaseDatos = async (nr) =>{
    const chars = await axios.get(`https://rickandmortyapi.com/api/character?page=${nr}`)
    return chars
}