import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../lib/context';
import { useRouter } from "next/router";
import { logout } from '../lib/auth'
import { create } from '../lib/shortener'

export default function AddUrl() {
    const { isLoggedIn, setUser } = useContext(MyContext)
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            return router.push("/login");
        }
    }, [isLoggedIn])

    const shorten = async () => {
        if (!url) return setErrors({ url: "Url must not be empty" })
        if (!alias) return setErrors({ alias: "Alias must not be empty" })

        setLoading(true);
        const short = await(create(url, alias))
        setLoading(false);

        if (short.data && !short.error) {
            router.push('/dashboard')
        } else {
            setErrors({ server: short?.error?.message || 'Error from server' });
        }
    }

    const signOut = () => {
        logout()
        setUser(null)
        router.push('/login')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Add Url</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="flex justify-between align-center p-4 h-32 w-full text-6xl font-bold text-blue-600">
                <h1 className="text-6xl font-bold text-blue-600">
                    Url Shortener

                </h1>
                <span className="text-sm font-bold text-red-600 cursor-pointer" onClick={() => signOut()}>Logout</span>
            </header>
            <main className="flex flex-col items-center w-full mt-0 flex-1 px-8 text-center">


                <p className="flex flex-wrap w-full text-lg font-bold">
                    Fill the form
                </p>
                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <form className="w-full max-w-lg mt-8" onSubmit={(e) => { e.preventDefault(); shorten() }}>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <input onChange={(e) => setUrl(e.target.value)} placeholder="Enter url" className={`appearance-none block w-full text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.url ? "border-red-500" : "border-gray-200"}`} id="grid-url" type="text" />
                                {errors.url ? (
                                    <p className="text-red-500 text-xs italic">{errors.url}</p>

                                ) : ''}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <input onChange={(e) => setAlias(e.target.value)} placeholder="Enter alias" className={`appearance-none block w-full text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.alias ? "border-red-500" : "border-gray-200"}`} id="grid-alias" type="text" />
                                {errors.alias ? (
                                    <p className="text-red-500 text-xs italic">{errors.alias}</p>

                                ) : ''}
                            </div>
                        </div>
                        {errors.server ? (
                            <p className="text-red-500 text-xs italic">{errors.server}</p>

                        ) : ''}
                        <div className="flex flex-row flex-wrap justify-between">

                            <span className="text-blue-600 hover:text-gray-600 pt-2 md:p-6"> <Link href="/dashboard"> Back to Dashboard</Link></span>
                            <button disabled={loading} className={`w-full md:w-1/2 mt-3 flex justify-center hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-3 uppercase ${loading ? "bg-gray-200  text-black cursor-not-allowed" : "bg-gray-900  text-white cursor-pointer"}`}>
                                {loading ? (
                                    <>
                                        loading &nbsp;...
                                    </>
                                ) : 'Shorten'}
                            </button>
                        </div>
                    </form>

                </div>
            </main>
        </div>
    )
}
