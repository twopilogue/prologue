package com.b208.prologue.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private static String clientId;

    @Value("${github.clientId}")
    private void setClientId(String clientId){
        this.clientId=clientId;
    }

    @Override
    public String getUri() {
        return "https://github.com/login/oauth/authorize?client_id="+clientId+"&scope=repo";
    }
}