import { db } from "@/src"
import { postsTable } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { id: string } }){
    try{
        const id = parseInt(params.id)
        await db.delete(postsTable).where(eq(postsTable.id, id))
        return NextResponse.json({message: "Post deleted successfully", success: true}, {status: 200})
    }
    catch(err: any){
        console.log(`Error in Deleting Posts - ${err.message}`)
        return NextResponse.json({message: 'Internal Server Error', error: err.message, success: false}, {status: 500})
    }
}