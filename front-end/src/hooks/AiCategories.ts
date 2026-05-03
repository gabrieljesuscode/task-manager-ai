export async function AICategories() {
    const response = await fetch(import.meta.env.VITE_API_URL + '/ai-categories');

    if (!response.ok) {
        console.error('Failed to fetch AI categories');
        throw new Error('Failed to fetch AI categories');
    }

    const data = await response.json();
    console.log(data);

    return data;
}