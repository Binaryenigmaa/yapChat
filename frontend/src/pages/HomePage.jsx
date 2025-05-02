import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore.js";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-300">
      <div className="flex justify-center items-center lg:pt-13 pt-12 lg:px-2">
        <div className="bg-base-200 rounded-lg shadow-lg w-full max-w-8xl lg:h-[calc(100vh-4rem)] h-[calc(100vh-3rem)] overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
