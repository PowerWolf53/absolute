package com.example.demo.service.exception;

public class WrongLoginOrPasswordException extends RuntimeException {

    public WrongLoginOrPasswordException(String message){
        super(message);
    }
}
