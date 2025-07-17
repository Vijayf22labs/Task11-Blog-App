export const formatDate = (createdAt: Date | string) =>{
    const date = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
    return date
}