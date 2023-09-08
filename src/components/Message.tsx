"use client"
import React from 'react';
import { useState, useEffect } from 'react';

export default function Message({ai, user, content}: {ai: boolean, user: boolean, content: string}){
  
  
  const [resultText, setResultText] = useState('');  // 使用useState来保存结果

  useEffect(() => {

  if (ai && content) {
    const generate = async () => {
      try {
        // Fetch the response from the OpenAI API with the signal from AbortController
          const response = await fetch("http://localhost:5328/api/python", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content }),
          });
          
          // 处理streaming response
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // Massage and parse the chunk of data
            const chunk = decoder.decode(value);
            console.log("Original chunk:", chunk);
            setResultText(prevText => prevText + chunk);  // 使用setState更新状态
            // console.log("Result text:", resultText);
          }
        } catch (error) {
              console.error("Error occurred while generating:", error.message);
        }
      };
      generate();
    }

    }, [ai, content]);

  //得到resultText的更新值
  //   useEffect(() => {
  //     console.log("Updated resultText:", resultText);
  // }, [resultText]);

    let messageContent = user ? content : (ai ? resultText : '有什么可以帮你的吗？');

    
    return (
        <div className={`flex ${user ? 'flex-row-reverse' : ''}`}>
          <img 
            src="robot_ai.png"
            className="w-10 h-10 rounded-full"  
          />
    
          <div className="flex flex-col ml-4">
            <div className="px-4 py-2 rounded-lg">
              <p>{messageContent}</p>
            </div>
    
            <div className="text-gray-500 text-sm mt-2 flex justify-between invisible group-hover:visible">
              <div>时间</div>
              <div className="flex">
                {/* <CopyButton /> */}
              </div>
            </div>
          </div>
        </div>
      )
}


