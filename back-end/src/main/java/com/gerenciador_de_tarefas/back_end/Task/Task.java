package com.gerenciador_de_tarefas.back_end.Task;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "tarefas")
@Entity(name = "tarefas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean isCompleted;  

    public Task(TaskRequestDTO data) {
        this.title = data.title();
        this.description = data.description() != "" ? data.description() : "Nenhuma descrição adicionada"; // Default to empty string if null
        this.isCompleted = false; // Default value
    }
}
