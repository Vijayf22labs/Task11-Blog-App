"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from '../../(utils)/Axios';
import { handleError } from '../../(utils)/handleError';
import { Loader2 } from 'lucide-react';

export default function Create() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [isCreatingPost, setIsCreatingPost] = useState(false)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreatingPost(true)
        setError({
            title: "",
            description: "",
            category: ""
        })

        try{
            const response = await Axios.post('/posts/create', {title: formData.title, description: formData.description, category: formData.category})
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
    };

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
                    <button type="submit" disabled={isCreatingPost} className={`px-6 py-2 rounded-lg text-white cursor-pointer disabled:cursor-not-allowed disabled:'bg-blue-400' bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-x-2`}>{isCreatingPost ? <><Loader2 className='size-5 animate-spin' />Creating...</> : 'Create Post'}</button>
                </div>
            </form>
        </div>
    );
}