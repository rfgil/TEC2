package com.tecdigital.tec.web.rest;

import com.tecdigital.tec.domain.Estimate;
import com.tecdigital.tec.repository.EstimateRepository;
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
 * REST controller for managing {@link com.tecdigital.tec.domain.Estimate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstimateResource {

    private final Logger log = LoggerFactory.getLogger(EstimateResource.class);

    private static final String ENTITY_NAME = "estimate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstimateRepository estimateRepository;

    public EstimateResource(EstimateRepository estimateRepository) {
        this.estimateRepository = estimateRepository;
    }

    /**
     * {@code POST  /estimates} : Create a new estimate.
     *
     * @param estimate the estimate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estimate, or with status {@code 400 (Bad Request)} if the estimate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estimates")
    public ResponseEntity<Estimate> createEstimate(@Valid @RequestBody Estimate estimate) throws URISyntaxException {
        log.debug("REST request to save Estimate : {}", estimate);
        if (estimate.getId() != null) {
            throw new BadRequestAlertException("A new estimate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estimate result = estimateRepository.save(estimate);
        return ResponseEntity.created(new URI("/api/estimates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estimates} : Updates an existing estimate.
     *
     * @param estimate the estimate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estimate,
     * or with status {@code 400 (Bad Request)} if the estimate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estimate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estimates")
    public ResponseEntity<Estimate> updateEstimate(@Valid @RequestBody Estimate estimate) throws URISyntaxException {
        log.debug("REST request to update Estimate : {}", estimate);
        if (estimate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Estimate result = estimateRepository.save(estimate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estimate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estimates} : get all the estimates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estimates in body.
     */
    @GetMapping("/estimates")
    public List<Estimate> getAllEstimates() {
        log.debug("REST request to get all Estimates");
        return estimateRepository.findAll();
    }

    /**
     * {@code GET  /estimates/:id} : get the "id" estimate.
     *
     * @param id the id of the estimate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estimate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estimates/{id}")
    public ResponseEntity<Estimate> getEstimate(@PathVariable Long id) {
        log.debug("REST request to get Estimate : {}", id);
        Optional<Estimate> estimate = estimateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estimate);
    }

    /**
     * {@code DELETE  /estimates/:id} : delete the "id" estimate.
     *
     * @param id the id of the estimate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estimates/{id}")
    public ResponseEntity<Void> deleteEstimate(@PathVariable Long id) {
        log.debug("REST request to delete Estimate : {}", id);
        estimateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
