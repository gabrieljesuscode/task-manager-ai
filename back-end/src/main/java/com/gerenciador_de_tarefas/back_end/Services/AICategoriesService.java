package com.gerenciador_de_tarefas.back_end.Services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.mistralai.MistralAiChatOptions;
import org.springframework.ai.mistralai.api.MistralAiApi;
import org.springframework.ai.mistralai.api.MistralAiApi.ChatCompletionRequest.ResponseFormat;
import org.springframework.stereotype.Service;

import com.gerenciador_de_tarefas.back_end.Task.TaskRepository;
import com.gerenciador_de_tarefas.back_end.Task.TaskResponseDTO;

import lombok.AllArgsConstructor;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@AllArgsConstructor
@Service
public class AICategoriesService {

    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;
    private final TaskRepository taskRepository;

    public Map<String, List<String>> getCategoriesPrompt(){

        List<TaskResponseDTO> tasks = taskRepository.findAllByOrderByIdDesc();

        String formattedTasks = tasks.stream()
            .map(task -> task.title())
            .collect(Collectors.joining(", ")); // Faz a lista de tarefas existentes para a IA ler

        String promptText = String.format("""
                Agrupe as tarefas abaixo em 1 a 3 categorias genéricas, cada categoria deve ter em seu 
                nome apenas uma palavra. Pode usar acentuação. Lembre-se que só pode haver 3 categorias no máximo, 
                e cada tarefa deve pertencer a apenas uma categoria. Mantenha uma lógica para que no próximo prompt a IA 
                possa categorizar novas tarefas usando as mesmas categorias criadas nesse prompt.
                Não pode usar essas categorias: "Outros, Diversos, Vários, Tarefas" e sinônimos dessas.
                Responda **exclusivamente** com um objeto JSON no formato:
                {"Categoria1": ["Tarefa1", "Tarefa2"], "Categoria2": ["Tarefa3"]}

                Tarefas:
                %s
                """, formattedTasks);

            var options = MistralAiChatOptions.builder()
                .model(MistralAiApi.ChatModel.MISTRAL_SMALL.getValue())
                .responseFormat(ResponseFormat.jsonObject())
                .build();

            Prompt prompt = new Prompt(promptText, options);
            ChatResponse response = chatModel.call(prompt);
            String JsonResponse = response.getResult().getOutput().getText();

            try {
                return objectMapper.readValue(JsonResponse, new TypeReference<Map<String, List<String>>>(){});
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse AI response", e);
            }
            
    }
}
