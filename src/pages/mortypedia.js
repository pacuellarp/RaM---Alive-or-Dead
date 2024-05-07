import { useState } from "react";
import Layout from "@layout/MainLayout";
import Circle from "@components/Circle/Circle";
import DescriptivePhrase from "@components/DescriptivePhrase/DescriptivePhrase";
import MainMortypedia from "@components/MainMortypedia/MainMortypedia";
import RadioButtonMortypedia from "@components/RadioButtonMortypedia/RadioButtonMortypedia";
import SearchBar2 from "@components/SearchBar2/SearchBar2";

export default function Mortypedia() {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedOptionToFetch, setSelectedOptionToFetch] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showData, setShowData] = useState(false);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowButton(true);
    setShowData(true);
  };

  const handleResetClick = () => {
    setSelectedItemId(null);
    setShowData(false);
    setTimeout(() => {
      setShowButton(false);
    }, 300);
  };

  return (
    <Layout pageName={"Mortypedia | Rick-a-nation"}>
      <Circle
        message={"Mortypedia"}
        colorText={"text-second-blue"}
        textOutline={"text-outline-5"}
        shape={"shape3"}
      />
      <DescriptivePhrase
        mainPhrase={"Learn more about your favourite series!"}
        secondPhrase={"Select what you want to learn more about."}
        thirdPhrase={"Type, discover and search again."}
        colorMainPhrase={"text-[#1177BF]"}
      />
      <RadioButtonMortypedia
        selectedOptionToFetch={selectedOptionToFetch}
        setSelectedOptionToFetch={setSelectedOptionToFetch}
        showData={showData}
      />
      <SearchBar2
        colorBackground={"bg-[#faf5b5]"}
        colorHoverBorder={"hover:border-[#F2E96B]"}
        colorFocusBorder={"focus:border-[#f0e663]"}
        handleItemClick={handleItemClick}
        selectedItemId={selectedItemId}
        showButton={showButton}
        selectedOptionToFetch={selectedOptionToFetch}
      />
      {showData && (
        <MainMortypedia
          selectedItemId={selectedItemId}
          selectedOptionToFetch={selectedOptionToFetch}
          showData={showData}
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
