package com.example.demo.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.exception.UserAlreadyExistsException;
import com.example.demo.service.exception.WrongLoginOrPasswordException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public void signUp(User user) {
        Optional<User> foundUser = userRepository.findByLoginAndPassword(user.getLogin(), user.getPassword());
        if(foundUser.isPresent()){
            throw new UserAlreadyExistsException("Пользователь с таким логином уже существует");
        }else {
            userRepository.save(user);
        }
    }

    @Override
    public void signIn(User user) {
        Optional<User> foundUser = userRepository.findByLoginAndPassword(user.getLogin(), user.getPassword());
        if(!foundUser.isPresent()){
            throw new WrongLoginOrPasswordException("Неверный логин или пароль");
        }
    }
}
