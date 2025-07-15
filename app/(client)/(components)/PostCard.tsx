import Link from 'next/link';
import React from 'react'

interface postProps{
  post: {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
  }
}

const PostCard = ({ post }: postProps) => {
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white hover:bg-gray-50/50">
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-2">#{post.category}</span>
              <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">{post.title}</h2>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap mt-1">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          <p className="text-gray-600 line-clamp-3 mb-3">{post.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-gray-500">Published</span>
            </div>
            <Link href={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Read more →</Link>
          </div>
        </div>
      </div>
    )
}

export default PostCard