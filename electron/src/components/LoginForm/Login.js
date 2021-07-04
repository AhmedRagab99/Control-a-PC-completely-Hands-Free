import React from 'react'
import { Link } from "react-router-dom";
import Toggle from '../Theme/Toggle';
import { useHistory } from "react-router-dom";


export default function Login() {
    const history = useHistory();

    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = { Email, Password };
        console.log(userInfo);
    }

    const routeChange = (path) => {
        history.push(path);
    }


    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (

        <div className="flex flex-wrap w-full bg-gray-100 dark:bg-gray-800">
        <div className="absolute top-0 left-0 p-2"><Toggle /></div>
            <div className="flex flex-col w-full md:w-1/2">

                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <div class="px-2 sm:px-6">
                        <h3 class="text-xl text-gray-800 dark:text-gray-100 sm:text-2xl md:text-lg font-bold leading-tight">Login To Your Account</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
                        <div className="flex flex-col pt-5">
                            <div className="flex relative ">
                                <span className="Textarea">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input id="email" required aria-required="true" name="email" type="email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)} className=" Textinput focus:border" placeholder="Email" />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4 mb-12">
                            <div className="flex relative ">
                                <span className="Textarea">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="password" required
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)} className=" Textinput focus:border" placeholder="Password" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800 dark:text-gray-100">
                                    Remember me
                                 </label>
                            </div>

                            
                        </div>

                        <button type="submit" class="button" onClick = {() => routeChange('/home')} >
                            Login
                        </button>
                    </form>
                    <div className="pt-12 pb-12 text-center ">
                        <p className='text-gray-800 dark:text-gray-100'>
                            Don&#x27;t have an account?
                            <Link to="/register" className="underline text-indigo-600 dark:text-indigo-400">
                                Register here.
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
            <div className="w-1/2 shadow-2xl">
                <img className="object-cover md:object-fill w-full h-screen " src="images/2.jpg" alt="" />
            </div>
        </div>

    )
}
