import { db } from "@/src"
import { postsTable } from "@/src/db/schema"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const posts = await db.select().from(postsTable)
        return NextResponse.json({success: true, posts: posts}, {status: 200})
    }
    catch(err: any){
        console.log(`Error in Fetching Posts - ${err.message}`)
        return NextResponse.json({message: 'Internal Server Error', error: err.message, success: false}, {status: 500})
    }
}