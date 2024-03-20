import Layout from "@layout/MainLayout";
import Circle from "@components/Circle/Circle";
import DescriptivePhrase from "@components/DescriptivePhrase/DescriptivePhrase";
import SearchBar from "@components/SearchBar/SearchBar";
import MainAliveOrDead from "@components/MainAliveOrDead/MainAliveOrDead";

export default function AliveOrDead() {
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
      />
      <MainAliveOrDead />
    </Layout>
  );
}
