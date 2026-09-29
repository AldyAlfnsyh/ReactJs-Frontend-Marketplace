import { useState } from "react";

const ReplyToggle = ({ onPost }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handlePost = () => {
    if (replyText.trim() === "") return;

    //panggil function dari parent (kirim ke API)
    onPost(replyText);

    // reset
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div>
      {!showReply ? (
        <button
          className="my-3 rounded-md px-2 py-1 bg-blue-600 text-white"
          onClick={() => setShowReply(true)}
        >
          Reply
        </button>
      ) : (
        <div className="w-full">
          <textarea
            className="mb-2 w-full bg-gray-100 border border-gray-300 rounded-md"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex flex-row justify-end">
            <div className="flex flex-row gap-2 my-3">
              <button
                className="rounded-md px-2 py-1 bg-blue-600 text-white w-full"
                onClick={() => setShowReply(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md px-2 py-1 bg-blue-600 text-white w-full"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyToggle;
