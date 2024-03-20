export default async function getEntity(inputEntity) {
  // Use destructuring to get query params

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Reusable function to fetch entities
  const fetchEntity = async (url) => {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  try {
    // Fetch all categories if no id
    const entity = await fetchEntity(`${apiUrl}${inputEntity}`);
    return entity;
  } catch (error) {
    // handle error
  }
}
