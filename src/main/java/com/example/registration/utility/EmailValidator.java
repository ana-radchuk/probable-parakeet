package com.example.registration.login;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {

    @Override
    public boolean test(String s) {

        // TODO: implement regex for email validation

        return true;
    }
}
