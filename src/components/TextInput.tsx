"use client"
import React from 'react';
import { useState } from 'react';

export default function TextInput(props) {
  const [inputValue, setInputValue] = useState('');


  const handleClick = () => {
    console.log('click');
    if(inputValue) {
      props.onSend(inputValue);
      setInputValue('');//清空输入框
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.metaKey) {
      console.log('command + enter');
      handleClick();
    }
  };

  return (
    <div className="flex-1 justify-between h-14 rounded-lg flex items-center px-4 border border-gray-300">
      <input 
        type="text"
        className="flex-1 border-none focus:outline-none"
        placeholder="开始输入..." 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <img 
        src="send.svg"
        className="w-5 h-5 mr-1" 
        onClick={handleClick} 
        style={{cursor: 'pointer'}}
      />
    </div>
  )
}
