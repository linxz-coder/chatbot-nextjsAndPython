'use client'
require('dotenv').config();

// page.tsx
import TextInput from '../components/TextInput';
import Message from '../components/Message';
import { useState } from 'react';


export default function HomePage() {

  // 文本输入框
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (text) => {
      setUserInput(text);
      setMessages([...messages, { content: text }]);
  };


  // rendering
  return (
    <div className="flex h-screen">

      {/* 左侧区块 */}
      <div className="w-1/3 bg-white">
        
        {/* 头部 */}
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-3xl font-bold text-pink-500">ChatGPT</h1>
          <img 
        src="new.svg"
        className="w-5 h-5"  
      />
        </div>

        {/* 搜索框 */}
        <div className="px-4 flex items-center justify-between mb-4">
          <SearchInput />
          <NewChatIcon />
        </div>

        {/* 聊天列表 */}
        <div className="overflow-auto">
          <ChatItem />
          <ChatItem />
        </div>

      </div>

      {/* 右侧区块 */}
      <div className="flex-1 bg-gray-100">
        
        {/* 头部 */}
        <ChatHeader />
        
        {/* 消息列表 */}
        <div className="flex flex-col flex-1 overflow-auto p-4">
          <Message content="有什么可以帮你的？"/>
          {userInput && (
            <>
              {messages.map((message, index) => (
                <div key={index}>
                    <Message user content={message.content} />
                    <Message ai content={message.content} />
                </div>

              ))}
            </>
          )}
          {/* <Message ai content="会的"/> */}
          {/* <Message user content="这是信息"/> */}
          {/* <Message ai content="这是信息"/> */}
          {/* <Message user content="这是信息"/> */}
        </div>
        
        {/* 底部输入框 */}
        <div className="flex items-center border-t p-4">
          <TextInput onSend={handleSendMessage} />
          <SendIcon />  
        </div>

      </div>

    </div>
  )
}

function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-4 h-16 border-b">
      <h3 className="text-lg font-medium truncate">对话标题</h3>
      
      <div className="flex items-center">
        <i className="ri-download-line text-2xl mx-3"/>
        <i className="ri-user-add-line text-2xl mx-3"/>  
        <i className="ri-settings-3-line text-2xl mx-3"/>
      </div>

    </div>
  )
}

function SearchInput() {
  return (
    <div className="flex-1 justify-between items-center h-10 flex rounded-lg border">
      <input 
        type="text"
        className="h-full border-none" 
        placeholder="  搜索"
      />
      <img 
        src="search.svg"
        className="w-5 h-5 mr-1"  
      />
    </div>  
  )
}

// 其他组件实现类似
// 消息列表项
function ChatItem() {
  return (
    <div className="flex flex-col p-4 cursor-pointer">
      
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium truncate">对话标题</h4>
        <span>16:20</span>  
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-gray-600 truncate">最后一条消息...</span>
        <span className="text-sm">私聊</span>
      </div>
      
    </div>
  )
}

// 新消息图标
function NewChatIcon() {
  return (
    <i className="ri-chat-new-line text-2xl cursor-pointer hover:bg-gray-200 p-2 rounded-lg"></i>
  )
}

// 发送图标
function SendIcon() {
  return (
    <i className="ri-send-plane-fill text-2xl cursor-not-allowed text-gray-400"></i>
  ) 
}

// 复制按钮
function CopyButton() {
  return (
    <span className="bg-gray-200 py-1 px-2 rounded-lg text-xs mr-2">
      复制
    </span>
  )
}




// 输入框 -> components/TextInput.tsx
