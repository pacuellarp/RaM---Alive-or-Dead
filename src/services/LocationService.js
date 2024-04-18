export default async function handler(req, res) {
  if (req.method === "GET") {
    const location = await getLocation();
    res.status(200).json(location);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getLocation(id) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/location/${id}`;
  let location = {};

  try {
    const response = await fetch(url);
    const data = await response.json();

    location = data;

    return location;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, retorna un array vacío
  }
}
