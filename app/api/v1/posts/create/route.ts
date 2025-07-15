import { db } from "@/src"
import { postsTable } from "@/src/db/schema"
import { postSchema } from "@/src/validators/postSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body = await req.json()

        const parsed = postSchema.safeParse(body)
        if(!parsed.success){
            return NextResponse.json({success: false, message: "Validation Failed", error: parsed.error.flatten().fieldErrors}, {status: 400})
        }

        const { title, description, category } = parsed.data   
        const newPost = await db.insert(postsTable).values({
            title: title,
            description: description,
            category: category
        }).returning()
        return NextResponse.json({message: "Post created successfully", success: true, newPost: newPost}, {status: 201})
    }
    catch(err: any){
        console.log(`Error in Creating Posts - ${err.message}`)
        return NextResponse.json({message: 'Internal Server Error', error: err.message, success: false}, {status: 500})
    }
}