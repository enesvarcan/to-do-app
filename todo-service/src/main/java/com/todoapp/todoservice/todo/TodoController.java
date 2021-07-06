package com.todoapp.todoservice.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "todoapp/todo")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping(path = "/user/{username}")
    public List<Todo> getTodoItems(@PathVariable("username") String username) {
        return todoService.getTodosByUsername(username);
    }

    @GetMapping(path = "/{todoId}")
    public Optional<Todo> getTodoItem(@PathVariable("todoId") String todoId) {
        return todoService.getTodoById(todoId);
    }

    @PostMapping
    public void addTodoItem(@RequestBody Todo todoItem){
        todoService.createTodo(todoItem);
    }

    @PutMapping("/{todoId}")
    public void updateTodoItem(@RequestBody Todo newTodo, @PathVariable("todoId") String todoId){
        todoService.updateTodo(newTodo, todoId);
    }

    @DeleteMapping("/{todoId}")
    public void deleteTodoItem(@PathVariable("todoId") String todoId) {
        todoService.deleteTodo(todoId);
    }
}
