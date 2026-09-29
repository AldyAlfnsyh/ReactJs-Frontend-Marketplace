import axios from "axios";
import { useEffect, useState } from "react";
import ReplyToggle from "./ReplyToggle";
import DropdownMenu from "./DropdownMenu";

function Comment({ id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComment = async () => {
    await axios
      .get(`http://localhost:8000/api/product/${id}/comment`)
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((error) => {
        console.log(
          "Error fetching data comment",
          error.response.status,
          error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReplyPost = (text) => {
    console.log("Balasan untuk", id, ":", text);
    //kirim ke API, tambahkan ket state parent, dll
  };

  useEffect(() => {
    fetchComment();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <div>
        <div className="w-full mb-3">
          <h1 className="mt-5 mb-2">Comment Section</h1>
          <textarea
            className="w-full bg-gray-100 border border-gray-300 rounded-md"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
          <div className="flex flex-row justify-end">
            <a
              href="#"
              className="bg-blue-600 rounded-md text-white px-2 py-1 mt-3"
            >
              Post
            </a>
          </div>
        </div>
      </div>

      {comments.map((comment, i) => {
        return (
          <div key={i}>
            <div className=" w-full mb-2">
              <div className="flex flex-row gap-3">
                <div>
                  <div
                    className=" rounded-full bg-black"
                    style={{ width: "3rem", height: "3rem" }}
                  ></div>
                </div>
                <div className="w-full">
                  <div className="flex flex-row justify-between">
                    <h1 className="">
                      <strong>{comment.user.name}</strong>
                    </h1>
                    <DropdownMenu />
                  </div>
                  <p className="">{comment.content}</p>

                  <ReplyToggle onPost={handleReplyPost} />
                </div>
              </div>
              <hr className="" />

              {flattenReplies(comment.replies).map((reply) => (
                <div key={reply.id} className="ml-4 mt-2 border-start ps-3">
                  <div className="flex flex-row gap-3">
                    <div>
                      <div
                        className="rounded-full bg-black"
                        style={{ width: "3rem", height: "3rem" }}
                      ></div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-row justify-between">
                        <h1 className="">
                          <strong>{reply.user.name}</strong>
                        </h1>
                        <DropdownMenu />
                      </div>
                      <p className="">{reply.content}</p>
                      <ReplyToggle onPost={handleReplyPost} />
                    </div>
                  </div>
                  <hr className="" />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  function flattenReplies(replies) {
    const result = [];

    const traverse = (items) => {
      for (const item of items) {
        result.push(item);
        if (item.replies && item.replies.length > 0) {
          traverse(item.replies);
        }
      }
    };

    traverse(replies);
    return result;
  }
}

export default Comment;
