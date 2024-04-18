export default async function handler(req, res) {
  if (req.method === "GET") {
    const infoEpisodes = await getInfoEpisodes();
    res.status(200).json(infoEpisodes);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getInfoEpisodes() {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/episode`;
  let infoEpisodes;

  try {
    const response = await fetch(url);
    const data = await response.json();

    infoEpisodes = data.info.count; //Sólo la info

    return infoEpisodes;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
