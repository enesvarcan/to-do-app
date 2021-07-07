package com.todoapp.todoservice.todo;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Todo {

    @Id
    private String _id;

    private String username;
    private String title;
    private String description;
    private int priority;
    private Date createdAt;
    private Date  dueBy;
    private Date doneAt;
    private boolean isDone;

    public Todo() {
    }

    public Todo(String username, String title) {
        this.username = username;
        this.title = title;
        this.priority = 0;
        this.createdAt = new Date();
    }

    public Todo(String username, String title, String description, int priority, Date createdAt, Date dueBy,
                Date doneAt) {
        this.username = username;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.createdAt = createdAt;
        this.dueBy = dueBy;
        this.doneAt = doneAt;
    }

    public String getId() {
        return _id;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        if (title != null) this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description != null) this.description = description;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        if (priority != getPriority()) this.priority = priority;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getDueBy() {
        return dueBy;
    }

    public void setDueBy(Date dueBy) {
        if (dueBy != null) this.dueBy = dueBy;
    }

    public Date getDoneAt() {
        return doneAt;
    }

    public void setDoneAt(Date doneAt) {
        this.doneAt = doneAt;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id='" + _id + '\'' +
                ", username='" + username + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", priority=" + priority +
                ", createdAt=" + createdAt +
                ", dueBy=" + dueBy +
                ", doneAt=" + doneAt +
                ", isDone=" + isDone +
                '}';
    }
}
