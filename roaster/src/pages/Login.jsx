import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault()

        await axios.post("http://localhost:8080/api/v1/login", {
                email: email,
                password: password
            })
            .then((res) => {
                console.log(res)

                if (res.data == "Login successful") {
                    navigate('/home')
                } else {
                    console.log('Incorrect email or password')
                }

            })
            .catch((err) => {
                console.log(err)
            })    
    }
  return (
    <div>
        <form>
            <div className='pb-4 grid place-content-center'>
                <h1 className='text-3xl'>Login</h1>
            </div>

            <div className='py-2 flex flex-row justify-between'>
                <label htmlFor="email"
                    className='pr-2 pt-1'>Email:</label>

                <input type="email" name="email" id="email" placeholder="" required
                    className='border rounded'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
            </div>

            <div className='py-2 flex flex-row justify-between'>
                <label htmlFor="password"
                    className='pr-2 pt-1'>Password:</label>
                    
                <input type="password" name="password" id="password" placeholder="" required
                    className='border rounded' 
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </div>
            
            <div className='py-2 flex flex-row justify-end'>
                <button type="submit"
                    className='border rounded p-1 bg-gray-200'
                    onClick={login}
                >Submit</button>
            </div> 
        </form>   
    </div>
  )
}

export default Login
