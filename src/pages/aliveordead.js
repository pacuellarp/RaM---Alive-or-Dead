import { useState } from "react";
import Layout from "@layout/MainLayout";
import Circle from "@components/Circle/Circle";
import DescriptivePhrase from "@components/DescriptivePhrase/DescriptivePhrase";
import SearchBar from "@components/SearchBar/SearchBar";
import MainAliveOrDead from "@components/MainAliveOrDead/MainAliveOrDead";

export default function AliveOrDead() {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowButton(true);
    setShowCharacter(true);
  };

  const handleResetClick = () => {
    setSelectedItemId(null);
    setShowCharacter(false);
    setTimeout(() => {
      setShowButton(false);
    }, 300);
  };

  return (
    <Layout pageName={"Rick-a-nation | Alive or Dead"}>
      <Circle
        message={"Alive or Dead"}
        colorText={"text-principal-green"}
        textOutline={"text-outline-2"}
        shape={"shape"}
      />
      <DescriptivePhrase
        mainPhrase={"Are they alive? Dead? Let's check it!"}
        secondPhrase={
          "Type the name of your favourite character or browse by searching for a word."
        }
        thirdPhrase={"Click on a character and find out their destiny!"}
        colorMainPhrase={"text-[#1177BF]"}
      />
      <SearchBar
        colorBackground={"bg-[#11AEBF]"}
        colorHoverBorder={"hover:border-blue-400"}
        colorFocusBorder={"focus:border-blue-600"}
        handleItemClick={handleItemClick}
        selectedItemId={selectedItemId}
        showButton={showButton}
      />
      {!showCharacter && <div className="my-40"></div>}
      {showButton && (
        <MainAliveOrDead
          showButton={showButton}
          selectedItemId={selectedItemId}
          showCharacter={showCharacter}
        />
      )}
      {showButton && (
        <div className="flex items-center justify-center">
          <button
            className={`${selectedItemId != null ? "animation-up" : "animation-down"} absolute rounded-full bg-[#F2EA77] px-4 py-2 font-bold text-[#241F40] hover:bg-[#E0E694]`}
            onClick={handleResetClick}
          >
            Back to search for another one
          </button>
        </div>
      )}
    </Layout>
  );
}
