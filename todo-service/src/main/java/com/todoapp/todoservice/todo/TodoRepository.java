package com.todoapp.todoservice.todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findTodosByUsername (String username);
    List<Todo> findTodosByUsernameAndDoneAtBetween(String username, Date yesterday, Date today);

}
