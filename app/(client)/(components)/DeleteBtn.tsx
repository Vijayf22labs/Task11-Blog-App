 "use client"

import { Loader2, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Axios } from '../(utils)/Axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const DeleteBtn = ({ id }: { id: number }) => {

    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete(event: any){
        event.preventDefault()
        setIsDeleting(true)
        try{
            const response = await Axios.delete(`/posts/delete/${id}`)
            if(response.data.success){
                toast.success(response.data.message)
                router.push('/')
            }
        }
        catch(err: any){
            console.log(`Error in Handle Delete - ${err.message}`)
            toast.error(err.response.data.error || `Internal server error`)
        }
        finally{
            setIsDeleting(false)
        }
    }

    return (
        <button onClick={(event) =>handleDelete(event)} className="inline-flex cursor-pointer disabled:cursor-not-allowed items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-md transition-colors">
            {!isDeleting ? 
                <>
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Delete Post
                </> : 
                <>
                    <Loader2 className='animate-spin size-4 mr-1.5' />
                    Deleting...
                </>
            }
        </button>
    )
}

export default DeleteBtn