package com.gerenciador_de_tarefas.back_end.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gerenciador_de_tarefas.back_end.Task.Task;
import com.gerenciador_de_tarefas.back_end.Task.TaskRepository;
import com.gerenciador_de_tarefas.back_end.Task.TaskRequestDTO;
import com.gerenciador_de_tarefas.back_end.Task.TaskResponseDTO;

@RestController
@RequestMapping("/tarefas")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @CrossOrigin(origins = "*" ,allowedHeaders = "*")
    @GetMapping
    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAllByOrderByIdDesc();
    }

    @CrossOrigin(origins = "*" ,allowedHeaders = "*")
    @PostMapping
    public void saveTask(@RequestBody TaskRequestDTO data) {

        Task task = new Task(data);

        taskRepository.save(task);
        return;
    }

    @CrossOrigin(origins = "*" ,allowedHeaders = "*")
    @PutMapping
    public void updateTask(@RequestBody TaskResponseDTO data){
        Task task = taskRepository.findById(data.id()).orElseThrow();
        
        task.setTitle(data.title());
        task.setDescription(data.description());
        task.setCompleted(data.isCompleted());

        taskRepository.save(task);

        return;
    }

    @CrossOrigin(origins = "*" ,allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
        return "";
    }

    @CrossOrigin(origins = "*" ,allowedHeaders = "*")
    @PatchMapping("/{id}")

    public void toggleTaskCompletion(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElseThrow();

        task.setCompleted(!task.isCompleted());

        taskRepository.save(task);
    }
}
