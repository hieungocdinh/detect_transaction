package com.hieudinh.detecttransaction.repository;

import com.hieudinh.detecttransaction.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    @Modifying
    @Transactional
    @Query(value = """
        DELETE FROM Transaction t
        WHERE t.deleted = true
        AND t.deletedAt < :threshold
    """)
    void deleteSoftDeleteTransaction(@Param("threshold") Instant threshold);
}
