import Layout from "@layout/MainLayout";
import PortalVideo from "@components/PortalVideo/PortalVideo";


export default function Home() {
  return (
    <Layout pageName={"Rick and Morty: Alive or Dead"}>
        <PortalVideo />
    </Layout>
  );
}