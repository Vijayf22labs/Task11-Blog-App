import DeleteBtn from "@/app/(client)/(components)/DeleteBtn";
import { PostProps } from "@/app/(client)/(types)/types";
import { Axios } from "@/app/(client)/(utils)/Axios";
import { ArrowLeft, Calendar, Clock, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

export const dynamic = "force-static"
export const revalidate = 60

export default async function Post({ params }: { params: { id: string } }) {
    let id = parseInt(params.id)
    let post: PostProps | null = null

    try{
        const response = await Axios.get(`/posts/get`)
        if(response.data.success){
            post = response.data.posts.find((element: any) =>element.id == id)
        } 
    } 
    catch(err: any){
        console.log(`Failed to fetch post - ${err.message}`)
        toast.error(err.response.data.error || `Internal server error`)
    }

    if(!post){
        return notFound()
    }


    const createdDate = new Date(post.createdAt).toLocaleString()
    const updatedDate = post.updatedAt ? new Date(post.updatedAt).toLocaleString() : null

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to posts
            </Link>

            <article className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">{post.category}</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
                <p className="text-gray-700 text-lg mb-6">{post.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500 mb-8">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        <span>Created: {createdDate}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        <span>Updated: {updatedDate}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                    <Link href={`/edit/${post.id}`} className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Edit className="w-4 h-4 mr-1.5" />
                        Edit Post
                    </Link>
                    <DeleteBtn id={id} />
                </div>
            </article>
        </div>
    );
}
