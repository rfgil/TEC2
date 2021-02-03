package com.tecdigital.tec.web.rest;

import com.tecdigital.tec.Tec2App;
import com.tecdigital.tec.domain.Estimate;
import com.tecdigital.tec.repository.EstimateRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.tecdigital.tec.domain.enumeration.EstimateStatus;
/**
 * Integration tests for the {@link EstimateResource} REST controller.
 */
@SpringBootTest(classes = Tec2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class EstimateResourceIT {

    private static final Integer DEFAULT_NUMBER = 0;
    private static final Integer UPDATED_NUMBER = 1;

    private static final Integer DEFAULT_VERSION = 0;
    private static final Integer UPDATED_VERSION = 1;

    private static final EstimateStatus DEFAULT_STATUS = EstimateStatus.Pending;
    private static final EstimateStatus UPDATED_STATUS = EstimateStatus.Accepted;

    private static final Integer DEFAULT_CUSTOMER_ID = 1;
    private static final Integer UPDATED_CUSTOMER_ID = 2;

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_MATURITY = 1;
    private static final Integer UPDATED_MATURITY = 2;

    private static final LocalDate DEFAULT_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_PROFIT_MARGIN = new BigDecimal(0);
    private static final BigDecimal UPDATED_PROFIT_MARGIN = new BigDecimal(1);

    private static final BigDecimal DEFAULT_COMMISSION = new BigDecimal(0);
    private static final BigDecimal UPDATED_COMMISSION = new BigDecimal(1);

    private static final BigDecimal DEFAULT_DISCOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_DISCOUNT = new BigDecimal(1);

    private static final Integer DEFAULT_DELIVERY_METHOD_ID = 1;
    private static final Integer UPDATED_DELIVERY_METHOD_ID = 2;

    private static final LocalDate DEFAULT_DELIVERY_DATETIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELIVERY_DATETIME = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private EstimateRepository estimateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstimateMockMvc;

    private Estimate estimate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estimate createEntity(EntityManager em) {
        Estimate estimate = new Estimate()
            .number(DEFAULT_NUMBER)
            .version(DEFAULT_VERSION)
            .status(DEFAULT_STATUS)
            .customerId(DEFAULT_CUSTOMER_ID)
            .reference(DEFAULT_REFERENCE)
            .date(DEFAULT_DATE)
            .maturity(DEFAULT_MATURITY)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .profitMargin(DEFAULT_PROFIT_MARGIN)
            .commission(DEFAULT_COMMISSION)
            .discount(DEFAULT_DISCOUNT)
            .deliveryMethodId(DEFAULT_DELIVERY_METHOD_ID)
            .deliveryDatetime(DEFAULT_DELIVERY_DATETIME)
            .notes(DEFAULT_NOTES);
        return estimate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estimate createUpdatedEntity(EntityManager em) {
        Estimate estimate = new Estimate()
            .number(UPDATED_NUMBER)
            .version(UPDATED_VERSION)
            .status(UPDATED_STATUS)
            .customerId(UPDATED_CUSTOMER_ID)
            .reference(UPDATED_REFERENCE)
            .date(UPDATED_DATE)
            .maturity(UPDATED_MATURITY)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .profitMargin(UPDATED_PROFIT_MARGIN)
            .commission(UPDATED_COMMISSION)
            .discount(UPDATED_DISCOUNT)
            .deliveryMethodId(UPDATED_DELIVERY_METHOD_ID)
            .deliveryDatetime(UPDATED_DELIVERY_DATETIME)
            .notes(UPDATED_NOTES);
        return estimate;
    }

    @BeforeEach
    public void initTest() {
        estimate = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstimate() throws Exception {
        int databaseSizeBeforeCreate = estimateRepository.findAll().size();
        // Create the Estimate
        restEstimateMockMvc.perform(post("/api/estimates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estimate)))
            .andExpect(status().isCreated());

        // Validate the Estimate in the database
        List<Estimate> estimateList = estimateRepository.findAll();
        assertThat(estimateList).hasSize(databaseSizeBeforeCreate + 1);
        Estimate testEstimate = estimateList.get(estimateList.size() - 1);
        assertThat(testEstimate.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testEstimate.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testEstimate.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testEstimate.getCustomerId()).isEqualTo(DEFAULT_CUSTOMER_ID);
        assertThat(testEstimate.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testEstimate.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testEstimate.getMaturity()).isEqualTo(DEFAULT_MATURITY);
        assertThat(testEstimate.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testEstimate.getProfitMargin()).isEqualTo(DEFAULT_PROFIT_MARGIN);
        assertThat(testEstimate.getCommission()).isEqualTo(DEFAULT_COMMISSION);
        assertThat(testEstimate.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testEstimate.getDeliveryMethodId()).isEqualTo(DEFAULT_DELIVERY_METHOD_ID);
        assertThat(testEstimate.getDeliveryDatetime()).isEqualTo(DEFAULT_DELIVERY_DATETIME);
        assertThat(testEstimate.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    public void createEstimateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estimateRepository.findAll().size();

        // Create the Estimate with an existing ID
        estimate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstimateMockMvc.perform(post("/api/estimates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estimate)))
            .andExpect(status().isBadRequest());

        // Validate the Estimate in the database
        List<Estimate> estimateList = estimateRepository.findAll();
        assertThat(estimateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCustomerIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = estimateRepository.findAll().size();
        // set the field null
        estimate.setCustomerId(null);

        // Create the Estimate, which fails.


        restEstimateMockMvc.perform(post("/api/estimates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estimate)))
            .andExpect(status().isBadRequest());

        List<Estimate> estimateList = estimateRepository.findAll();
        assertThat(estimateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstimates() throws Exception {
        // Initialize the database
        estimateRepository.saveAndFlush(estimate);

        // Get all the estimateList
        restEstimateMockMvc.perform(get("/api/estimates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estimate.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].customerId").value(hasItem(DEFAULT_CUSTOMER_ID)))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].maturity").value(hasItem(DEFAULT_MATURITY)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].profitMargin").value(hasItem(DEFAULT_PROFIT_MARGIN.intValue())))
            .andExpect(jsonPath("$.[*].commission").value(hasItem(DEFAULT_COMMISSION.intValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.intValue())))
            .andExpect(jsonPath("$.[*].deliveryMethodId").value(hasItem(DEFAULT_DELIVERY_METHOD_ID)))
            .andExpect(jsonPath("$.[*].deliveryDatetime").value(hasItem(DEFAULT_DELIVERY_DATETIME.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    @Transactional
    public void getEstimate() throws Exception {
        // Initialize the database
        estimateRepository.saveAndFlush(estimate);

        // Get the estimate
        restEstimateMockMvc.perform(get("/api/estimates/{id}", estimate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estimate.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.customerId").value(DEFAULT_CUSTOMER_ID))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.maturity").value(DEFAULT_MATURITY))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.profitMargin").value(DEFAULT_PROFIT_MARGIN.intValue()))
            .andExpect(jsonPath("$.commission").value(DEFAULT_COMMISSION.intValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.intValue()))
            .andExpect(jsonPath("$.deliveryMethodId").value(DEFAULT_DELIVERY_METHOD_ID))
            .andExpect(jsonPath("$.deliveryDatetime").value(DEFAULT_DELIVERY_DATETIME.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }
    @Test
    @Transactional
    public void getNonExistingEstimate() throws Exception {
        // Get the estimate
        restEstimateMockMvc.perform(get("/api/estimates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstimate() throws Exception {
        // Initialize the database
        estimateRepository.saveAndFlush(estimate);

        int databaseSizeBeforeUpdate = estimateRepository.findAll().size();

        // Update the estimate
        Estimate updatedEstimate = estimateRepository.findById(estimate.getId()).get();
        // Disconnect from session so that the updates on updatedEstimate are not directly saved in db
        em.detach(updatedEstimate);
        updatedEstimate
            .number(UPDATED_NUMBER)
            .version(UPDATED_VERSION)
            .status(UPDATED_STATUS)
            .customerId(UPDATED_CUSTOMER_ID)
            .reference(UPDATED_REFERENCE)
            .date(UPDATED_DATE)
            .maturity(UPDATED_MATURITY)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .profitMargin(UPDATED_PROFIT_MARGIN)
            .commission(UPDATED_COMMISSION)
            .discount(UPDATED_DISCOUNT)
            .deliveryMethodId(UPDATED_DELIVERY_METHOD_ID)
            .deliveryDatetime(UPDATED_DELIVERY_DATETIME)
            .notes(UPDATED_NOTES);

        restEstimateMockMvc.perform(put("/api/estimates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstimate)))
            .andExpect(status().isOk());

        // Validate the Estimate in the database
        List<Estimate> estimateList = estimateRepository.findAll();
        assertThat(estimateList).hasSize(databaseSizeBeforeUpdate);
        Estimate testEstimate = estimateList.get(estimateList.size() - 1);
        assertThat(testEstimate.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testEstimate.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testEstimate.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEstimate.getCustomerId()).isEqualTo(UPDATED_CUSTOMER_ID);
        assertThat(testEstimate.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testEstimate.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testEstimate.getMaturity()).isEqualTo(UPDATED_MATURITY);
        assertThat(testEstimate.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testEstimate.getProfitMargin()).isEqualTo(UPDATED_PROFIT_MARGIN);
        assertThat(testEstimate.getCommission()).isEqualTo(UPDATED_COMMISSION);
        assertThat(testEstimate.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testEstimate.getDeliveryMethodId()).isEqualTo(UPDATED_DELIVERY_METHOD_ID);
        assertThat(testEstimate.getDeliveryDatetime()).isEqualTo(UPDATED_DELIVERY_DATETIME);
        assertThat(testEstimate.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingEstimate() throws Exception {
        int databaseSizeBeforeUpdate = estimateRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstimateMockMvc.perform(put("/api/estimates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estimate)))
            .andExpect(status().isBadRequest());

        // Validate the Estimate in the database
        List<Estimate> estimateList = estimateRepository.findAll();
        assertThat(estimateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstimate() throws Exception {
        // Initialize the database
        estimateRepository.saveAndFlush(estimate);

        int databaseSizeBeforeDelete = estimateRepository.findAll().size();

        // Delete the estimate
        restEstimateMockMvc.perform(delete("/api/estimates/{id}", estimate.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estimate> estimateList = estimateRepository.findAll();
        assertThat(estimateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
