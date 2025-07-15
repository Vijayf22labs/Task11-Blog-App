import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='shadow-xl mb-7 flex items-center justify-between py-4 px-5'>
            <h1 className='text-2xl font-bold'>Blog App</h1>
            <Link className='flex p-2 bg-blue-600 text-white rounded sm:px-5 hover:bg-blue-400 duration-300 items-center gap-x-1' href={"/create"}>
                <Plus /><span className='sm:block hidden'>Create</span>
            </Link>
        </header>
    )
}

export default Header