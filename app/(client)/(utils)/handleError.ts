import toast from "react-hot-toast";

export const handleError = (err: any, setError: any) =>{
    const apiError = err.response?.data?.error;

    if (apiError && typeof apiError === "object"){
        setError({
            title: apiError.title?.[0] || "",
            description: apiError.description?.[0] || "",
            category: apiError.category?.[0] || ""
        })
    } 
    else{
        toast.error(err.message || "An unexpected error occurred")
    }
}