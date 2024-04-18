import Layout from "@layout/MainLayout";
import Circle from "@components/Circle/Circle";
import DescriptivePhrase from "@components/DescriptivePhrase/DescriptivePhrase";
import MainRickANation from "@components/MainRick-A-Challenge/MainRick-A-Challenge";

export default function RickAChallenge() {
  return (
    <Layout pageName={"Rick-a-challenge! | Rick-a-nation"}>
      <Circle
        message={"Rick-a-challenge!"}
        colorText={"text-principal-orange"}
        textOutline={"text-outline-4"}
        shape={"shape2"}
      />
      <DescriptivePhrase
        mainPhrase={"It's time for a challenge!"}
        secondPhrase={"Answer the trivia below."}
        thirdPhrase={"Let's see how much you know about Rick and Morty!"}
        colorMainPhrase={"text-[#1177BF]"}
      />
      <MainRickANation />
    </Layout>
  );
}
