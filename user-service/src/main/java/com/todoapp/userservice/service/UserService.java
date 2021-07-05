package com.todoapp.userservice.service;

import com.todoapp.userservice.entities.Kullanici;
import com.todoapp.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    public Kullanici save(Kullanici kullanici) {
        return userRepository.save(kullanici);
    }

    public Kullanici getById(Long id) {
        return userRepository.getById(id);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public List<Kullanici> findAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User("foo","foo", new ArrayList<>());
    }
}

