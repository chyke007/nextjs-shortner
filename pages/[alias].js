import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSingle } from "../lib/shortener";


const AliasView = ({ error }) => {
    const router = useRouter()
    useEffect(() => {

        if (error) {
            return router.push('/')
        }
    }, [])

    return null
};

export async function getServerSideProps({ params }) {
    const url = await getSingle(params.alias)
    if (url.data && (url.data?.attributes?.results[0] || false) && !url.error) {
        return {
            redirect: {
                destination: url.data.attributes.results[0].url,
                permanent: false,
            },
        }
    }

    return {
        props: { error: "error" }
    }
}

export default AliasView;