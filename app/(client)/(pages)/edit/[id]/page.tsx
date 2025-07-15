"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleError } from '@/app/(client)/(utils)/handleError';
import { Axios } from '@/app/(client)/(utils)/Axios';
import { Loader, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { use } from "react";

export default function Edit({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params)
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [isEditingPost, setIsEditingPost] = useState(false)
    const [isFetchingPost, setIsFetchingPost] = useState(false)
    const [error, setError] = useState({
        title: "",
        description: "",
        category: ""
    })

    const categories = [
        { value: 'general', label: 'General' },
        { value: 'technology', label: 'Technology' },
        { value: 'business', label: 'Business' },
        { value: 'health', label: 'Health' },
        { value: 'entertainment', label: 'Entertainment' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }
    
    async function fetchPost(){
        setIsFetchingPost(true)
        try{
            const response = await Axios.get(`/posts/get`)
            if(response.data.success){
                let post = response.data.posts.find((element: any) =>element.id == id)
                setFormData({
                    title: post.title,
                    description: post.description,
                    category: post.category
                })
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsEditingPost(true)
        setError({
            title: "",
            description: "",
            category: ""
        })

        try{
            const response = await Axios.put(`/posts/edit/${id}`, {title: formData.title, description: formData.description, category: formData.category})
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all" placeholder="Enter post title" />
                    {error.title && <p className="text-red-500 text-sm mt-1">{error.title}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full resize-none px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all" placeholder="Write your post content here..." />
                    {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all bg-white">
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                    </select>
                    {error.category && <p className="text-red-500 text-sm mt-1">{error.category}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => router.push('/')} className="px-4 py-2 border cursor-pointer  border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" disabled={isEditingPost} className={`px-6 py-2 flex items-center justify-center gap-x-2 rounded-lg text-white cursor-pointer disabled:cursor-not-allowed disabled:'bg-blue-400' bg-blue-600 hover:bg-blue-700 transition-colors`}>{isEditingPost ? <><Loader2 className='size-5 animate-spin' />Editing...</> : 'Edit Post'}</button>
                </div>
            </form>
        </div>
    )
}