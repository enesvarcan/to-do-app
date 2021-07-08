package com.todoapp.todoservice.todo;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService (TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getTodosByUsername (String username) {
        return todoRepository.findTodosByUsername(username);
    }

    public Optional<Todo> getTodoById (String todoId) {
        return todoRepository.findById(todoId);
    }

    public void createTodo (Todo todo) {
        todoRepository.save(todo);
    }

    public void updateTodo(Todo newTodo, String todoId) {
        Optional<Todo> todo = todoRepository.findById(todoId);

        if(todo.isPresent()) {
            Todo todoToBeUpdated = todo.get();
            todoToBeUpdated.setTitle(newTodo.getTitle() == null ? todoToBeUpdated.getTitle() : newTodo.getTitle());
            todoToBeUpdated.setDescription(newTodo.getDescription() == null ? todoToBeUpdated.getDescription() : newTodo.getDescription());
            todoToBeUpdated.setPriority(newTodo.getPriority());
            todoToBeUpdated.setDueBy(newTodo.getDueBy() == null ? todoToBeUpdated.getDueBy() : newTodo.getDueBy());
            if(!todoToBeUpdated.isDone() && newTodo.isDone()){
                todoToBeUpdated.setDone(true);
                todoToBeUpdated.setDoneAt(new Date());
            }
            if(todoToBeUpdated.isDone() && !newTodo.isDone()) {
                todoToBeUpdated.setDone(false);
                todoToBeUpdated.setDoneAt(null);
            }

            todoRepository.save(todoToBeUpdated);
        }
    }

    public void deleteTodo(String todoId) {
        Optional<Todo> todoItem = todoRepository.findById(todoId);

        if(todoItem.isPresent()) todoRepository.deleteById(todoId);
        else throw new IllegalStateException("cannot_find_todo_item");
    }

    public List<Todo> getDailyTodos(String username){
        return todoRepository.findTodosByUsernameAndDoneAtBetween(
                username,
                new Date(System.currentTimeMillis()-24*60*60*1000),
                new Date());
    }
}
