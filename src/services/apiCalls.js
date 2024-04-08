import axios from "axios"


export const getBaseDatos = async (nr) =>{
    const chars = await axios.get(`http://rickandmortyapi.com/api/character?page=${nr}`)
    return chars
}