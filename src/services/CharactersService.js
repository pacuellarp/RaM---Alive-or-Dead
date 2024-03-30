export default async function handler(req, res) {
  if (req.method === "GET") {
    const allCharacters = await getAllCharacters();
    res.status(200).json(allCharacters);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getAllCharacters() {
  let nextPage = `${process.env.NEXT_PUBLIC_API_URL}/character`;
  let allCharacters = [];

  try {
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      // Extrae los atributos requeridos de cada objeto y los agrega a la lista
      data.results.forEach((character) => {
        allCharacters.push({
          id: character.id,
          name: character.name,
          image: character.image,
          origin: {
            name: character.origin.name,
          },
        });
      });

      // Actualiza la URL de la próxima página o termina si no hay más páginas
      nextPage = data.info.next;
    }

    return allCharacters;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
