import Layout from "@layout/MainLayout";
import PortalVideo from "@components/PortalVideo/PortalVideo";
import InfoMainPage from "@components/InfoMainPage/InfoMainPage";

export default function Home() {
  return (
    <Layout pageName={"Rick-a-nation"}>
      <PortalVideo />
      <InfoMainPage />
    </Layout>
  );
}
