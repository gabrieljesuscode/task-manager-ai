const state = {
  lastCallTime: 0
};


export async function AICategories() {
    const now = Date.now();

    // Prevenir overflow de chamadas para a API
    if (now - state.lastCallTime < 5000) {
        console.warn('Aguardando 5 segundos desde a última chamada');
        return;
    }

    state.lastCallTime = now; // Restaura o timer

    const response = await fetch(import.meta.env.VITE_API_URL + '/ai-categories');

    if (!response.ok) {
        console.error('Failed to fetch AI categories');
        throw new Error('Failed to fetch AI categories');
    }

    const data = await response.json();
    console.log(data);

    return data;
}