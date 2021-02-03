package com.tecdigital.tec.web.rest;

import com.tecdigital.tec.domain.WorkItem;
import com.tecdigital.tec.repository.WorkItemRepository;
import com.tecdigital.tec.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tecdigital.tec.domain.WorkItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WorkItemResource {

    private final Logger log = LoggerFactory.getLogger(WorkItemResource.class);

    private static final String ENTITY_NAME = "workItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkItemRepository workItemRepository;

    public WorkItemResource(WorkItemRepository workItemRepository) {
        this.workItemRepository = workItemRepository;
    }

    /**
     * {@code POST  /work-items} : Create a new workItem.
     *
     * @param workItem the workItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workItem, or with status {@code 400 (Bad Request)} if the workItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/work-items")
    public ResponseEntity<WorkItem> createWorkItem(@Valid @RequestBody WorkItem workItem) throws URISyntaxException {
        log.debug("REST request to save WorkItem : {}", workItem);
        if (workItem.getId() != null) {
            throw new BadRequestAlertException("A new workItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkItem result = workItemRepository.save(workItem);
        return ResponseEntity.created(new URI("/api/work-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /work-items} : Updates an existing workItem.
     *
     * @param workItem the workItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workItem,
     * or with status {@code 400 (Bad Request)} if the workItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/work-items")
    public ResponseEntity<WorkItem> updateWorkItem(@Valid @RequestBody WorkItem workItem) throws URISyntaxException {
        log.debug("REST request to update WorkItem : {}", workItem);
        if (workItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WorkItem result = workItemRepository.save(workItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /work-items} : get all the workItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of workItems in body.
     */
    @GetMapping("/work-items")
    public List<WorkItem> getAllWorkItems() {
        log.debug("REST request to get all WorkItems");
        return workItemRepository.findAll();
    }

    /**
     * {@code GET  /work-items/:id} : get the "id" workItem.
     *
     * @param id the id of the workItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/work-items/{id}")
    public ResponseEntity<WorkItem> getWorkItem(@PathVariable Long id) {
        log.debug("REST request to get WorkItem : {}", id);
        Optional<WorkItem> workItem = workItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workItem);
    }

    /**
     * {@code DELETE  /work-items/:id} : delete the "id" workItem.
     *
     * @param id the id of the workItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/work-items/{id}")
    public ResponseEntity<Void> deleteWorkItem(@PathVariable Long id) {
        log.debug("REST request to delete WorkItem : {}", id);
        workItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
