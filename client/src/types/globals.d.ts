export {};

declare global {
    interface Book {
        _id: string;
        title: string;
        authors: string[];
        categories: string[];
        description: string;
        image: string;
        publishedDate: string;
        rating: number;
        subtitle: string;
        commentIds: string[];
    }

    interface Book {
        id: string;
        commentBody: string;
        upvotes: number;
    }
}
