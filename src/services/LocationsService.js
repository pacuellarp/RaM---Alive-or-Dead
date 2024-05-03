export default async function handler(req, res) {
  if (req.method === "GET") {
    const allLocations = await getAllLocations();
    res.status(200).json(allLocations);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getAllLocations() {
  let nextPage = `${process.env.NEXT_PUBLIC_API_URL}/location`;
  let allLocations = [];

  try {
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      // Extrae los atributos requeridos de cada objeto y los agrega a la lista
      data.results.forEach((location) => {
        allLocations.push({
          id: location.id,
          name: location.name,
          dimension: location.dimension,
        });
      });

      // Actualiza la URL de la próxima página o termina si no hay más páginas
      nextPage = data.info.next;
    }

    return allLocations;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
