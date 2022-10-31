package com.b208.prologue.api.request.github;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateTreeRequest {

    Tree[] trees;
    String base_tree;
}

class Tree{

    String path;
    String mode;
    String type;
    String sha;

    public Tree(String path, String mode, String type, String sha){
        this.path = path;
        this.mode = mode;
        this.type = type;
        this.sha = sha;
    }
}