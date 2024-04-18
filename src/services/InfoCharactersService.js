export default async function handler(req, res) {
  if (req.method === "GET") {
    const infoCharacters = await getInfoCharacters();
    res.status(200).json(infoCharacters);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getInfoCharacters() {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/character`;
  let infoCharacters = {};

  try {
    const response = await fetch(url);
    const data = await response.json();

    infoCharacters = data.info.count; //Sólo la info

    return infoCharacters;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
