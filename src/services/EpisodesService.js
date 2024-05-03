export default async function handler(req, res) {
  if (req.method === "GET") {
    const allEpisodes = await getAllEpisodes();
    res.status(200).json(allEpisodes);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getAllEpisodes() {
  let nextPage = `${process.env.NEXT_PUBLIC_API_URL}/episode`;
  let allEpisodes = [];

  try {
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      // Extrae los atributos requeridos de cada objeto y los agrega a la lista
      data.results.forEach((episode) => {
        allEpisodes.push({
          id: episode.id,
          name: episode.name,
          episode: episode.episode,
        });
      });

      // Actualiza la URL de la próxima página o termina si no hay más páginas
      nextPage = data.info.next;
    }

    return allEpisodes;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
