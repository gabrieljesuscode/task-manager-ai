package com.gerenciador_de_tarefas.back_end.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gerenciador_de_tarefas.back_end.Services.AICategoriesService;

@RestController
@RequestMapping("/ai-categories")
public class AICategoriesController {

    @Autowired
    private AICategoriesService AICategoriesService;

    @CrossOrigin(origins = "*" ,allowedHeaders = "*")
    @GetMapping
    public Map<String, List<String>> getAICategories() {

        Map<String, List<String>> categories = AICategoriesService.getCategoriesPrompt();

        return categories;
    }
}
