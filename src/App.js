import React, { useState, useEffect } from "react";
import AddQuest from "./AddQuest";
import QuestList from "./QuestList";

function App() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    getQuests(); // Carrega as missões do localStorage quando o componente é montado
  }, []);

  function saveEditQuest(quest, title) {
    const editedQuest = {
      ...quest,
      title: title || quest.title,
    };

    const auxQuests = quests.map((q) =>
      q.id === editedQuest.id ? editedQuest : q
    );

    setQuests(auxQuests);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
  }

  function saveConcludedQuest(quest) {
    const editedQuest = {
      ...quest,
      status: "concluído",
    };

    const auxQuests = quests.map((q) =>
      q.id === editedQuest.id ? editedQuest : q
    );

    setQuests(auxQuests);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
  }

  function saveAddQuest(title) {
    const id = quests.length ? quests[quests.length - 1].id + 1 : 1;

    const createdQuest = {
      id: id,
      title: title,
      status: "aberto",
      created_at: new Date().toUTCString(),
    };

    const auxQuests = [...quests, createdQuest];
    setQuests(auxQuests);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
  }

  function getQuests() {
    const storedQuests = JSON.parse(window.localStorage.getItem("quests"));
    if (storedQuests) setQuests(storedQuests);
  }

  const concludedQuests = quests.filter((quest) => quest.status === "concluído");
  const notConcludedQuests = quests.filter((quest) => quest.status === "aberto");

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-[80%] lg:w-[50%] h-[70%] shadow-md rounded-sm transform ease-out duration-300 items-center p-10 gap-5">
        <h1 className="text-5xl font-work font-bold w-fit text-center">
          Quests To do
        </h1>
        <AddQuest saveAddQuest={saveAddQuest} />

        <div className=" flex flex-col gap-4 w-full items-center">
          <h2>Abertas</h2>
          <QuestList
            quests={notConcludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
          />
        </div>

        <div className=" flex flex-col gap-4 w-full items-center">
          <h2>Concluídas</h2>
          <QuestList
            quests={concludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
          />
        </div>
      </div>
    </div>
  );
}

export default App;