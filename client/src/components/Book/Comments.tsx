import {
    BsFillHandThumbsUpFill,
    BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { MouseEvent, useState } from "react";
import { api } from "../../utils/axios";
import { upvote, deleteComment } from "../../utils/api";

const Comments = ({ commentIds, bookId, getBookData }: CommentProps) => {
    const [commentBody, setCommentBody] = useState<string>("");

    const postComment = async (
        e: MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const response = await api.post("/comments", {
                commentBody,
                bookId,
            });
            if (response.status === 201) {
                setCommentBody("");
                getBookData();
            } else {
                throw new Error("Please try again...");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-1">
                <h1 className="font-bold">Add comment</h1>
                <textarea
                    onChange={(e) => setCommentBody(e.target.value)}
                    value={commentBody}
                    name="commentBody"
                    rows={4}
                    cols={2}
                    className="bg-gray-100 p-1 rounded-lg"
                    placeholder="Write here..."
                ></textarea>
                <button
                    onClick={(e) => postComment(e)}
                    type="submit"
                    className="w-[100px] h-[40px] bg-gray-300 rounded-lg hover:bg-gray-200"
                >
                    Submit
                </button>
            </form>
            {commentIds.length === 0 ? (
                <h1>No comments yet...</h1>
            ) : (
                <ul className="flex flex-col gap-2 border-2 h-[400px] rounded-lg">
                    {commentIds.map((comment, idx) => (
                        <li
                            key={idx}
                            className="flex flex-col border-b h-[120px] p-1"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-2 items-center ">
                                    <BsFillHandThumbsUpFill
                                        onClick={() =>
                                            upvote(comment.commentId, "upvote")
                                        }
                                        className="text-blue-300 hover:text-blue-500 cursor-pointer"
                                    />
                                    <p>{comment.upvotes}</p>
                                </div>
                                <div className="flex gap-2 items-center ">
                                    <BsFillHandThumbsDownFill
                                        onClick={() =>
                                            upvote(
                                                comment.commentId,
                                                "downvote"
                                            )
                                        }
                                        className="text-blue-300 hover:text-blue-500 cursor-pointer"
                                    />
                                    <p>{comment.downvotes}</p>
                                </div>
                                <ImBin
                                    onClick={() =>
                                        deleteComment(comment.commentId)
                                    }
                                    className="hover:text-red-600 cursor-pointer"
                                />
                            </div>
                            <p className="overflow-y-auto">
                                {comment.commentBody}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Comments;
