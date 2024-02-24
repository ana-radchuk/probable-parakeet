import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function register(e) {
        e.preventDefault()

        await axios.post("http://localhost:8080/api/v1/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })    
    }

  return (
    <div>
        <form>
            <div className='pb-4 grid place-content-center'>
                <h1 className='text-3xl'>Registration</h1>
            </div>

            <div className='py-2 flex flex-row justify-between'>
                <label htmlFor="firstName"
                    className='pr-2 pt-1'>First Name:</label>

                <input type="text" name="firstName" id="firstName" placeholder="" required
                    className='border rounded'
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
            </div>

            <div className='py-2 flex flex-row justify-between'>
                <label htmlFor="lastName"
                    className='pr-2 pt-1'>Last Name:</label>

                <input type="text" name="lastName" id="lastName" placeholder="" required
                    className='border rounded'
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />
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
                    onClick={register}
                >Submit</button>
            </div> 
        </form>
    </div>
  )
}

export default Register
