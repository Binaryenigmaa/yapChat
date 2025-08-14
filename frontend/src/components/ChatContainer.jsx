import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { ArrowLeft, MoreVertical, Send, Image, X } from "lucide-react";
import { formatTime } from "../utils/timeFormatter.js";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    isSidebarOpen,
    toggleSidebar,
    sendMessage,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const endMessageRef = useRef(null);
  const inputBoxRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    getMessages,
    selectedUser._id,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (endMessageRef.current && messages) {
      endMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSendMessage = async (formData) => {
    const message = formData.get("message");
    const payload = { text: message.trim(), image: imagePreview };
    // console.log(payload);
    await sendMessage(payload);
    setText("");
    setImagePreview(null);
    if (fileInputRef.current || inputBoxRef.current) {
      fileInputRef.current.value = "";
      inputBoxRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isMessagesLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div
      className={`bg-base-100 w-full lg:ml-80 flex flex-col h-full transform ${
        isSidebarOpen && !selectedUser ? "translate-x-full" : "translate-x-0"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-10`}
    >
      {/* Header */}
      {selectedUser ? (
        <div className="flex items-center justify-between p-3 border-b border-base-300">
          <div className="flex items-center space-x-3">
            <ArrowLeft
              className="w-6 h-6 lg:hidden cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center gap-8">
            <img
              src={selectedUser.profilepic}
              alt={selectedUser.fullname}
              className="rounded-full"
            />
            <span className="font-semibold lg:text-2xl lg:whitespace-nowrap">
              {selectedUser.fullname}
            </span>
          </div>
          <MoreVertical />
        </div>
      ) : null}
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedUser && messages.length > 0
          ? messages.map((message) => {
              console.log(message);
              console.log(authUser);
              return (
                <div
                  key={message._id}
                  ref={endMessageRef}
                  className={`chat ${
                    message.senderId === authUser._id
                      ? "chat-end"
                      : "chat-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.senderId === authUser._id
                        ? "bg-accent-content text-white"
                        : "bg-base-200 text-base-content"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Image"
                        className="sm:max-w-[200px] h-32 object-cover rounded-md mb-2"
                      />
                    )}
                    <p>{message.message}</p>
                    <span className="text-xs text-gray-500 ">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      {/* Message Input */}
      <div>
        {imagePreview && (
          <div className="mb-1 ml-4 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}
        {selectedUser ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSendMessage(formData);
            }}
            className="flex items-center p-3 border-t bg-base-200 border-base-300"
          >
            <input
              type="text"
              name="message"
              ref={inputBoxRef}
              placeholder="Type a message"
              className="flex-1 rounded-lg p-2 outline-none text-sm "
            />
            <div className="flex items-center space-x-4 pr-2 ml-2">
              <button type="submit">
                <Send className="w-6 h-6 ml-2 cursor-pointer " />
              </button>
              <label htmlFor="send-image">
                <Image className="cursor-pointer " />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  id="send-image"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default ChatContainer;
