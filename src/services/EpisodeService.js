export default async function handler(req, res) {
  if (req.method === "GET") {
    const episode = await getEpisode();
    res.status(200).json(episode);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getEpisode(id) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/episode/${id}`;
  let episode = {};

  try {
    const response = await fetch(url);
    const data = await response.json();

    episode = data;

    return episode;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
