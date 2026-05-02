package com.gerenciador_de_tarefas.back_end.Task;

public record TaskResponseDTO(Long id, String title, String description, Boolean isCompleted) {
    public TaskResponseDTO(Task task) {
        this(task.getId(), task.getTitle(), task.getDescription(), task.isCompleted());
    }
}
