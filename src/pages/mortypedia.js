import Layout from "@layout/MainLayout";
import Circle from "@components/Circle/Circle";
import DescriptivePhrase from "@components/DescriptivePhrase/DescriptivePhrase";
import MainMortypedia from "@components/MainMortypedia/MainMortypedia";

export default function Mortypedia() {
  return (
    <Layout pageName={"Rick-a-challenge! | Mortypedia"}>
      <Circle
        message={"Mortypedia"}
        colorText={"text-second-blue"}
        textOutline={"text-outline-5"}
        shape={"shape3"}
      />
      <DescriptivePhrase
        mainPhrase={"It's time for a challenge!"}
        secondPhrase={"Answer the trivia below."}
        thirdPhrase={"Let's see how much you know about Rick and Morty!"}
        colorMainPhrase={"text-[#1177BF]"}
      />
      <MainMortypedia />
    </Layout>
  );
}
