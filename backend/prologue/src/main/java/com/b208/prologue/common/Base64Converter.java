package com.b208.prologue.common;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

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
    }
}
