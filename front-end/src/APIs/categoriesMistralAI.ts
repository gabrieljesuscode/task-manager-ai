import { Mistral } from "@mistralai/mistralai";
import type { TaskData } from "../interfaces/TaskData";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";

const client = new Mistral({
    apiKey: apiKey
});


export default async function categoriesMistralAI(data: TaskData[]): Promise<Record<string, string[]>> {
    if (!data || data.length < 3) {
        return {};
    }

    const chatResponse = await client.chat.complete({

        model: "mistral-small-latest",
        messages: [
            {
            role: "user",
            content: [
                {
                type: "text",
                text: `Vou mandar uma lista de tarefas que um usuário tem, e quero que você responda de 
                1 a 3 categorias que se encaixam melhor para essas tarefas, e me responda apenas as categorias, 
                sem explicação. As categorias devem ser genéricas, como por exemplo: 'Trabalho', 'Lazer', 
                'Casa', 'Saúde', 'Educação', etc. Aqui estão as tarefas: \n\n- Comprar leite\n- 
                Marcar consulta médica\n- Finalizar relatório do trabalho\n- Agendar reunião com equipe\n- 
                Limpar a casa\n- Estudar para prova de matemática
                Devo receber uma resposta que é um objeto de arrays, em que cada categoria é um array das tarefas dessa forma: {"Casa": ["Comprar leite", "Limpar a casa"], "Saúde": ["Marcar consulta médica"], "Educação": ["Estudar para prova de matemática"]}
                Você pode usar essas palavras como categorias: "Compras", "Saúde", "Trabalho", "Casa", "Lazer", "Educação", "Esportes", "Tecnologia", "Culinária", "Viagem", "Finanças", "Arte", "Música", "Cinema", "Animais de Estimação", "Jardinagem", "Voluntariado", "Família", "Amigos" e etc.
                
                Fique a vontade para criar categorias que façam sentido com as tarefas, usando essas palavras como inspiração, 
                mas não se limite a elas.

                Essa é a lista de tarefas que você deve resumir de 1 a 3 categorias: \n\n${data.map(item => `- ${item.title}`).join('\n')}
                `,
                },
            ],
            },
        ],
    });

    const chatContent = chatResponse.choices[0].message?.content;

    if (!chatContent || typeof chatContent !== "string") {
        return {};
    }
    
    const categories = chatContent.replace(/```/g, '').replace(/json/g, '').trim();

    try {
        const parsed = JSON.parse(categories);

        if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
            return {};
        }

        return parsed as Record<string, string[]>;

    } catch (error) {
        console.log("Falha ao fazer parse da IA:", error)
        return {};
    }
}

