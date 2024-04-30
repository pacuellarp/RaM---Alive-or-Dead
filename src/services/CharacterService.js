export default async function handler(req, res) {
  if (req.method === "GET") {
    const character = await getCharacter();
    res.status(200).json(character);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getCharacter(id) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}character/${id}`;
  let character = {};

  try {
    const response = await fetch(url);
    const data = await response.json();

    character = data;

    return character;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
