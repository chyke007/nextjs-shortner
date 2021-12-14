import React, { useState, useEffect } from 'react';
import MyContext from '../lib/context';
import Cookie from "js-cookie";
import 'tailwindcss/tailwind.css'

export default function _App({ Component, pageProps }) {

  const [user, setUser] = useState(null)
  const [urls, setUrls] = useState([])
  
  useEffect(() => {
    const jwt = Cookie.get("jwt");
    if (jwt) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove("jwt");
          setUser(null);
        }
       
        const user = await res.json();
        setUser(user);
      });
    }
  }, [])

  return (
    <MyContext.Provider
      value={{
        user: user,
        isLoggedIn: !!user,
        setUser,
        setUrls,
        urls
      }}
    >

      <Component {...pageProps} />
    </MyContext.Provider>
    )
}
