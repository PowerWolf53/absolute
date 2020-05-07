package com.example.demo.service;

import com.example.demo.repository.model.User;

public interface UserService {

    void signUp(User user);

    void signIn(User user);
}
