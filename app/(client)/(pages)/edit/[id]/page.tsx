"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleError } from '@/app/(client)/(utils)/handleError';
import { Axios } from '@/app/(client)/(utils)/Axios';
import { Loader, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { use } from "react";
import { useForm } from '@tanstack/react-form';
import Input from '@/app/(client)/(components)/Input';
import { postSchema } from '@/src/validators/postSchema';
import { PostProps } from '@/app/(client)/(types)/types';

export default function Edit({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params)
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: ''
        },
        onSubmit: async({ value }) =>{
            handleSubmit(value.title, value.description, value.category)
            form.reset()
        }
    })

    const [isEditingPost, setIsEditingPost] = useState(false)
    const [isFetchingPost, setIsFetchingPost] = useState(false)
    const [error, setError] = useState(() =>({
        title: "",
        description: "",
        category: ""
    }))
    
    async function fetchPost(){
        setIsFetchingPost(true)
        try{
            const response = await Axios.get(`/posts/get`)
            if(response.data.success){
                let post: PostProps = response.data.posts.find((element: PostProps) =>element.id === parseInt(id))
                form.state.values.title = post.title
                form.state.values.description = post.description
                form.state.values.category = post.category
            } 
        } 
        catch(err: any){
            console.error(`Failed to fetch post - ${err.message}`)
            toast.error(err.response.data.error || `Internal server error`)
        }
        finally{
            setIsFetchingPost(false)
        }
    }

    useEffect(() =>{
        fetchPost()
    }, [])

    const handleSubmit = async (title: string, description: string, category: string) =>{
        setIsEditingPost(true)
        setError({
            title: "",
            description: "",
            category: ""
        })

        try{
            const response = await Axios.put(`/posts/edit/${id}`, {title: title, description: description, category: category})
            if(response.data.success){
                toast.success(response.data.message)
                router.push(`/post/${id}`)
            }
        } 
        catch(err: any){
            console.log(`Error in Editing Post - ${err.message}`)
            handleError(err, setError)
        } 
        finally{
            setIsEditingPost(false)
        }
    }

    if(isFetchingPost){
        return(
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin' />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
            
            <form onSubmit={(e) =>{e.preventDefault; form.handleSubmit();}} className="space-y-6">
                <form.Field name='title' validators={{onChange: postSchema.shape.title, onBlur: postSchema.shape.title}}>
                    {(field) =>(
                        <Input type='text' field={field} error={error} id='title' placeholder='Enter post title' label='Title' />
                    )}
                </form.Field>
                <form.Field name='description' validators={{onChange: postSchema.shape.description, onBlur: postSchema.shape.description}}>
                    {(field) =>(
                        <Input type='text' field={field} error={error} id='description' placeholder='Enter post description' label='Description' />
                    )}
                </form.Field>
                <form.Field name='category' validators={{onChange: postSchema.shape.category, onBlur: postSchema.shape.category}}>
                    {(field) =>(
                        <Input type='options' field={field} error={error} id='category' placeholder='Select a category' label='Category' />
                    )}
                </form.Field>

                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => router.push('/')} className="px-4 py-2 border cursor-pointer  border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" disabled={isEditingPost} className={`px-6 py-2 flex items-center justify-center gap-x-2 rounded-lg text-white cursor-pointer disabled:cursor-not-allowed disabled:'bg-blue-400' bg-blue-600 hover:bg-blue-700 transition-colors`}>{isEditingPost ? <><Loader2 className='size-5 animate-spin' />Editing...</> : 'Edit Post'}</button>
                </div>
            </form>
        </div>
    )
}