package com.b208.prologue.common;

<<<<<<< HEAD
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

@Component
public class Base64Converter {

    public String encode(String target) throws UnsupportedEncodingException {

        byte[] targetBytes = target.getBytes("UTF-8");

        Encoder encoder = Base64.getEncoder();
        String encodedString = encoder.encodeToString(targetBytes);

        System.out.println(encodedString);

        return encodedString;
    }

    public String decode(String target) throws UnsupportedEncodingException {

        Decoder decoder = Base64.getDecoder();
        String decodedString = new String(decoder.decode(target), "UTF-8");

        System.out.println(decodedString);

        return decodedString;
=======
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class Base64Converter {

    public static String alg = "AES/CBC/PKCS5Padding";

    private static String key;
    private static String iv;
    private static SecretKeySpec keySpec;
    private static IvParameterSpec ivParamSpec;

    @Value("${aes256.key}")
    private void setKey(String key){
        this.key=key;
        this.keySpec = new SecretKeySpec(key.getBytes(), "AES");
    }

    @Value("${aes256.iv}")
    private void setIv(String iv){
        this.iv=iv;
        this.ivParamSpec = new IvParameterSpec(iv.getBytes());
    }

    public String encryptAES256(String text) throws Exception {
        Cipher cipher = Cipher.getInstance(alg);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

        byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public String decryptAES256(String cipherText) throws Exception {
        Cipher cipher = Cipher.getInstance(alg);
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

        byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
        byte[] decrypted = cipher.doFinal(decodedBytes);
        return new String(decrypted, "UTF-8");
>>>>>>> a1760a4689afb5c2a84f2d1567f41ca6d7cf5eba
    }
}
