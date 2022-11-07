package com.b208.prologue.api.response.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetLatestBuildTimeResponse {

    @JsonProperty("updated_at")
    Date lastBuildTime;

}
