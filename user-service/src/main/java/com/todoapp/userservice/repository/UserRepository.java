package com.todoapp.userservice.repository;

import com.todoapp.userservice.entities.Kullanici;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Kullanici,Long> {

}