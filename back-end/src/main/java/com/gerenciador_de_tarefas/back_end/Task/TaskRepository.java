package com.gerenciador_de_tarefas.back_end.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<TaskResponseDTO> findAllByOrderByIdDesc();
}
