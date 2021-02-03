package com.tecdigital.tec.repository;

import com.tecdigital.tec.domain.WorkItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the WorkItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkItemRepository extends JpaRepository<WorkItem, Long> {
}
