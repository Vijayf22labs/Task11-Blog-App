import { Axios } from "./(client)/(utils)/Axios";
import PostCard from "./(client)/(components)/PostCard";
import { PostProps } from "./(client)/(types)/types";

export const dynamic = "force-static"
export const revalidate = 60

export default async function Home() {

  let posts = []

  try{
    const response = await Axios.get("/posts/get")
    if(response.data.success){
      posts = response.data.posts
    }
  } 
  catch(err: any){
    console.log(`Error in Fetch Post - ${err.message}`)
  }

  return (
    <div className="w-full px-4 py-6">
      {posts.length > 0 ?
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((element: PostProps) =>(
            <PostCard post={element} key={element.id} />
          ))}
        </div> :
        <p className="text-gray-500 text-center mt-10">No posts found.</p>
      }
    </div>
  );
}
