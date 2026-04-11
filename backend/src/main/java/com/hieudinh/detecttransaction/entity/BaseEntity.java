package com.hieudinh.detecttransaction.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    private UUID id = UUID.randomUUID();
    @Column(nullable = false, updatable = false, name = "created_at")
    private Instant createdAt;
    @Column(nullable = false, name = "updated_at")
    private Instant updatedAt;
    @Column(name = "is_deleted")
    private boolean deleted = false;
    @Column(name = "deleted_at")
    private Instant deletedAt;

    @PrePersist
    protected void onCreate(){
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = Instant.now();
    }

    @PreRemove
    protected void  onDelete(){
        this.deleted = true;
        this.deletedAt = Instant.now();
    }
}
