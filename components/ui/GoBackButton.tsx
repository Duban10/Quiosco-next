"use client"
import { useRouter } from 'next/navigation'
const GoBackButton = () => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}
            className='bg-amber-400 w-full text-black p-3 rounded-md lg:w-auto text-xl px-10 py-3 font-bold text-center cursor-pointer'
        >
            Volver
        </button>
    )
}

export default GoBackButton
