package com.b208.prologue.api.entity;

import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "auto_save_post")
public class AutoSavePost {

    @Id
    @Column(name = "github_id")
    private String githubId;

    @Column
    private String title;

    @Column(name = "representation", length = 1000)
    private String description;

    @Column
    private String category;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> tags;

    @Column(length = 10000)
    private String content;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updateTime;
}
