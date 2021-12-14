import Head from 'next/head'
import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../lib/context';
import { useRouter } from "next/router";
import Link from 'next/link';
import { logout } from '../lib/auth'
import { get, deleteAlias } from '../lib/shortner'

export default function Dashboard() {
    const { isLoggedIn, setUser, user, setUrls, urls } = useContext(MyContext)
    const router = useRouter()
    const getAll = async () => {
        let short = await get()
        if (!short) return
        setUrls(short?.data?.attributes?.results || null)
    }

    const deleteShort = async (id) => {
        if (!id) return
        let deleted = await deleteAlias(id)
        if (deleted.data && !deleted.error) {
            await getAll()
        }
    }
    useEffect(() => {
        if (!isLoggedIn) {
            return router.push("/login");
        }
        getAll()
    }, [urls.length])



    const signOut = () => {
        logout()
        setUser(null)
        router.push('/login')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="flex justify-between align-center p-4 h-32 w-full text-6xl font-bold text-blue-600">
                <h1 className="text-6xl font-bold text-blue-600">
                    Url Shortner

                </h1>
                <span className="text-sm font-bold text-red-600 cursor-pointer" onClick={() => signOut()}>Logout</span>
            </header>
            <main className="flex flex-col items-center w-full mt-0 flex-1 px-8 text-center">


                <p className="flex flex-wrap w-full text-lg font-bold">
                    Welcome {user?.username || ""}
                </p>
                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <div className="shadow  border-b w-full  overflow-hidden border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Url
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Alias/Shortned
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No of hits
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50">
                                        <span className="sr-only">Remove</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {(!urls || urls.length == 0) && (
                                    <tr>
                                        <td colSpan="3" className="px-2 py-4 whitespace-nowrap cursor-pointer">
                                            No record found
                                        </td>
                                    </tr>
                                )}

                                {urls && urls.map(short =>
                                (
                                    <tr className="hover:bg-gray-200" key={short.id}>
                                        <td className="px-2 py-4 whitespace-nowrap cursor-pointer" title = "Open Url" onClick={() => { window.open(`${short.url}`, 'blank') }}>
                                            <div className="text-sm text-gray-900">{short?.url || 'N/A'}</div>
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap cursor-pointer" title = "Test Alias" onClick={() => { window.open(`/${short.alias}`, 'blank') }}>
                                            <div className="text-sm text-gray-900">{short?.alias || 'N/A'}</div>
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap cursor-pointer">
                                            <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
                                                <div className="text-sm text-gray-500">
                                                    {short?.visit || 0}
                                                </div>
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-center text-sm font-medium">
                                            <button onClick={() => deleteShort(short.id)} className="text-red-600 hover:text-red-900 mx-1">Delete</button>
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
            <Link href="/addUrl">
                <button className="absolute rounded-full text-white font-bold text-lg p-2 bg-blue-800 w-12 h-12 m-4 right-0 bottom-0 hover:bg-blue-400"> + </button>
            </Link>
        </div>
    )
}
