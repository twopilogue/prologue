package com.b208.prologue.api.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
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
@Table(name = "temp_post")
public class TempPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "temp_post_id")
    private Long tempPostId;

    @Column
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

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createTime;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updateTime;
}
