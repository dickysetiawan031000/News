import { Link } from "@inertiajs/react";

const Navbar = ({ user }) => {
    console.log("isUser?", user);
    return (
        <div className="navbar bg-base-50">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">News</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-slate-300 text-black" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-300 text-black rounded-box w-52">
                        {!user ? (
                            <>
                                <li><Link href={route('login')} as="button">Login</Link></li>
                                <li><Link href={route('register')} as="button">Register</Link></li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={route('dashboard')} as="button">
                                        Dashboard
                                        <span className="badge">{user.name}</span>
                                    </Link>
                                </li>
                                <li><Link>Settings</Link></li>
                                <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Navbar
