import axios from 'axios'

const API_URL = '/api/users/'

// register user
const register = async (userDate)=>{
    const response = await axios.post(API_URL, userDate)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userDate)=>{
    const response = await axios.post(API_URL+'login', userDate)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = ()=>{
    localStorage.removeItem('user')
}

const authService ={
    register,
    logout,
    login,
}

export default authService