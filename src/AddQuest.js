import React, { useState } from "react";


function AddQuest(props) {
    const [inputValue, setInputValue] = useState("");
  
    return (
      <div className="flex gap-4 w-full justify-center items-center">
        <input
          placeholder="Insert your quest"
          className="rounded-full bg-secundary pl-2 input-sm flex w-[70%] focus:outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="flex items-center text-center rounded-full bg-primary h-fit px-2 text-lg transform ease-out duration-300"
          onClick={() => {
            props.saveAddQuest(inputValue);
            setInputValue(""); // Limpa o input após adicionar a missão
          }}
        >
          +
        </button>
      </div>
    );
  }
  
  export default AddQuest;