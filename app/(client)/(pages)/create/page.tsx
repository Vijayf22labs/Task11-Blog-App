"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from '../../(utils)/Axios';
import { handleError } from '../../(utils)/handleError';
import { Loader2 } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { postSchema } from '@/src/validators/postSchema';
import Input from '../../(components)/Input';

export default function Create() {
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
    const [isCreatingPost, setIsCreatingPost] = useState(false)
    const [error, setError] = useState(() =>({
        title: "",
        description: "",
        category: ""
    }))

    const handleSubmit = async (title: string, description: string, category: string) => {
        setIsCreatingPost(true)
        setError({
            title: "",
            description: "",
            category: ""
        })

        try{
            const response = await Axios.post('/posts/create', {title: title, description: description, category: category})
            if(response.data.success){
                router.push('/')
            }
        } 
        catch(err: any){
            console.log(`Error in Creating Post - ${err.message}`)
            handleError(err, setError)
        } 
        finally{
            setIsCreatingPost(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
            
            <form className="space-y-6" onSubmit={(e) =>{e.preventDefault; form.handleSubmit();}}>
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
                    <button type="submit" disabled={isCreatingPost} className={`px-6 py-2 rounded-lg text-white cursor-pointer disabled:cursor-not-allowed disabled:'bg-blue-400' bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-x-2`}>{isCreatingPost ? <><Loader2 className='size-5 animate-spin' />Creating...</> : 'Create Post'}</button>
                </div>
            </form>
        </div>
    );
}