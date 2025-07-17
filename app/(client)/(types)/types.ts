export interface PostProps{
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt?: string | null;
}

export interface eachPostProps{
    post: PostProps;
}

export interface inputProps{
    field: any;
    error?: object | any;
    id: string;
    type: string;
    placeholder: string;
    label: string;
}

export interface fieldErrorProps{
    field: any;
    error?: object | any;
}