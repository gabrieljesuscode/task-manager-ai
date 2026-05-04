package com.gerenciador_de_tarefas.back_end.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    
    List<TaskResponseDTO> findAllByOrderByIdDesc();
    
    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.title = :title, t.description = :description, t.isCompleted = :isCompleted WHERE t.id = :id")
    void updateTaskById(Long id, String title, String description, boolean isCompleted);
}
