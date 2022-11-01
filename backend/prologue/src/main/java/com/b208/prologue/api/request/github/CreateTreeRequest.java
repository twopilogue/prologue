package com.b208.prologue.api.request.github;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CreateTreeRequest {

    List<TreeRequest> tree;
    String base_tree;
}