package com.b208.prologue.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ApiModel("ModifyTempPostRequest")
public class ModifyTempPostRequest {

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotNull
    @ApiModelProperty(name = "임시 게시글 아이디", example = "1L", required = true)
    Long tempPostId;

    @ApiModelProperty(name = "게시글 제목", example = "게시글 제목", required = true)
    String title;

    @ApiModelProperty(name = "게시글 설명", example = "게시글 설명", required = true)
    String description;

    @ApiModelProperty(name = "카테고리", example = "카테고리", required = true)
    String category;

    @ApiModelProperty(name = "태그 리스트", example = "태그 리스트", required = true)
    List<String> tags;

    @ApiModelProperty(name = "게시글 내용", example = "게시글 내용", required = true)
    String content;
}
