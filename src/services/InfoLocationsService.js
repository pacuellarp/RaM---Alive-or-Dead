export default async function handler(req, res) {
  if (req.method === "GET") {
    const infoLocations = await getInfoLocations();
    res.status(200).json(infoLocations);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getInfoLocations() {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/location`;
  let infoLocations = {};

  try {
    const response = await fetch(url);
    const data = await response.json();

    infoLocations = data.info.count; //Sólo la info

    return infoLocations;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
