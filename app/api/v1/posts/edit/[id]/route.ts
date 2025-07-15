import { db } from "@/src"
import { postsTable } from "@/src/db/schema"
import { postSchema } from "@/src/validators/postSchema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { success } from "zod"

export async function PUT(req: Request, { params }: { params: { id: string } }){
    try{
        const id = parseInt(params.id)
        const body = await req.json()

        const parsed = postSchema.safeParse(body)
        if(!parsed.success){
            return NextResponse.json({success: false, message: "Validation Failed", error: parsed.error.flatten().fieldErrors}, {status: 400})
        }

        const { title, description, category } = parsed.data   
        const editedPost = await db.update(postsTable).set({
            title: title,
            description: description,
            category: category,
            updatedAt: new Date()
        }).where(eq(postsTable.id, id)).returning()
        return NextResponse.json({message: "Post edited successfully", success: true, editedPost: editedPost}, {status: 200})
    }
    catch(err: any){
        console.log(`Error in Editing Posts - ${err.message}`)
        return NextResponse.json({message: 'Internal Server Error', error: err.message, success: false}, {status: 500})
    }
}