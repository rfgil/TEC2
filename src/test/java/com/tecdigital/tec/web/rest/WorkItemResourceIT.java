package com.tecdigital.tec.web.rest;

import com.tecdigital.tec.Tec2App;
import com.tecdigital.tec.domain.WorkItem;
import com.tecdigital.tec.repository.WorkItemRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.tecdigital.tec.domain.enumeration.WorkItemStatus;
import com.tecdigital.tec.domain.enumeration.WorkItemType;
/**
 * Integration tests for the {@link WorkItemResource} REST controller.
 */
@SpringBootTest(classes = Tec2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class WorkItemResourceIT {

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DEADLINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEADLINE = LocalDate.now(ZoneId.systemDefault());

    private static final WorkItemStatus DEFAULT_STATUS = WorkItemStatus.ToDo;
    private static final WorkItemStatus UPDATED_STATUS = WorkItemStatus.InProgress;

    private static final WorkItemType DEFAULT_TYPE = WorkItemType.Task;
    private static final WorkItemType UPDATED_TYPE = WorkItemType.Task;

    private static final Integer DEFAULT_ESTIMATED_EMPLOYEE_HOURS = 0;
    private static final Integer UPDATED_ESTIMATED_EMPLOYEE_HOURS = 1;

    private static final Integer DEFAULT_ESTIMATED_MACHINE_HOURS = 0;
    private static final Integer UPDATED_ESTIMATED_MACHINE_HOURS = 1;

    @Autowired
    private WorkItemRepository workItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWorkItemMockMvc;

    private WorkItem workItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkItem createEntity(EntityManager em) {
        WorkItem workItem = new WorkItem()
            .quantity(DEFAULT_QUANTITY)
            .reference(DEFAULT_REFERENCE)
            .deadline(DEFAULT_DEADLINE)
            .status(DEFAULT_STATUS)
            .type(DEFAULT_TYPE)
            .estimatedEmployeeHours(DEFAULT_ESTIMATED_EMPLOYEE_HOURS)
            .estimatedMachineHours(DEFAULT_ESTIMATED_MACHINE_HOURS);
        return workItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkItem createUpdatedEntity(EntityManager em) {
        WorkItem workItem = new WorkItem()
            .quantity(UPDATED_QUANTITY)
            .reference(UPDATED_REFERENCE)
            .deadline(UPDATED_DEADLINE)
            .status(UPDATED_STATUS)
            .type(UPDATED_TYPE)
            .estimatedEmployeeHours(UPDATED_ESTIMATED_EMPLOYEE_HOURS)
            .estimatedMachineHours(UPDATED_ESTIMATED_MACHINE_HOURS);
        return workItem;
    }

    @BeforeEach
    public void initTest() {
        workItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkItem() throws Exception {
        int databaseSizeBeforeCreate = workItemRepository.findAll().size();
        // Create the WorkItem
        restWorkItemMockMvc.perform(post("/api/work-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(workItem)))
            .andExpect(status().isCreated());

        // Validate the WorkItem in the database
        List<WorkItem> workItemList = workItemRepository.findAll();
        assertThat(workItemList).hasSize(databaseSizeBeforeCreate + 1);
        WorkItem testWorkItem = workItemList.get(workItemList.size() - 1);
        assertThat(testWorkItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testWorkItem.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testWorkItem.getDeadline()).isEqualTo(DEFAULT_DEADLINE);
        assertThat(testWorkItem.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testWorkItem.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testWorkItem.getEstimatedEmployeeHours()).isEqualTo(DEFAULT_ESTIMATED_EMPLOYEE_HOURS);
        assertThat(testWorkItem.getEstimatedMachineHours()).isEqualTo(DEFAULT_ESTIMATED_MACHINE_HOURS);
    }

    @Test
    @Transactional
    public void createWorkItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workItemRepository.findAll().size();

        // Create the WorkItem with an existing ID
        workItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkItemMockMvc.perform(post("/api/work-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(workItem)))
            .andExpect(status().isBadRequest());

        // Validate the WorkItem in the database
        List<WorkItem> workItemList = workItemRepository.findAll();
        assertThat(workItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWorkItems() throws Exception {
        // Initialize the database
        workItemRepository.saveAndFlush(workItem);

        // Get all the workItemList
        restWorkItemMockMvc.perform(get("/api/work-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].deadline").value(hasItem(DEFAULT_DEADLINE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].estimatedEmployeeHours").value(hasItem(DEFAULT_ESTIMATED_EMPLOYEE_HOURS)))
            .andExpect(jsonPath("$.[*].estimatedMachineHours").value(hasItem(DEFAULT_ESTIMATED_MACHINE_HOURS)));
    }
    
    @Test
    @Transactional
    public void getWorkItem() throws Exception {
        // Initialize the database
        workItemRepository.saveAndFlush(workItem);

        // Get the workItem
        restWorkItemMockMvc.perform(get("/api/work-items/{id}", workItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(workItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.deadline").value(DEFAULT_DEADLINE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.estimatedEmployeeHours").value(DEFAULT_ESTIMATED_EMPLOYEE_HOURS))
            .andExpect(jsonPath("$.estimatedMachineHours").value(DEFAULT_ESTIMATED_MACHINE_HOURS));
    }
    @Test
    @Transactional
    public void getNonExistingWorkItem() throws Exception {
        // Get the workItem
        restWorkItemMockMvc.perform(get("/api/work-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkItem() throws Exception {
        // Initialize the database
        workItemRepository.saveAndFlush(workItem);

        int databaseSizeBeforeUpdate = workItemRepository.findAll().size();

        // Update the workItem
        WorkItem updatedWorkItem = workItemRepository.findById(workItem.getId()).get();
        // Disconnect from session so that the updates on updatedWorkItem are not directly saved in db
        em.detach(updatedWorkItem);
        updatedWorkItem
            .quantity(UPDATED_QUANTITY)
            .reference(UPDATED_REFERENCE)
            .deadline(UPDATED_DEADLINE)
            .status(UPDATED_STATUS)
            .type(UPDATED_TYPE)
            .estimatedEmployeeHours(UPDATED_ESTIMATED_EMPLOYEE_HOURS)
            .estimatedMachineHours(UPDATED_ESTIMATED_MACHINE_HOURS);

        restWorkItemMockMvc.perform(put("/api/work-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkItem)))
            .andExpect(status().isOk());

        // Validate the WorkItem in the database
        List<WorkItem> workItemList = workItemRepository.findAll();
        assertThat(workItemList).hasSize(databaseSizeBeforeUpdate);
        WorkItem testWorkItem = workItemList.get(workItemList.size() - 1);
        assertThat(testWorkItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testWorkItem.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testWorkItem.getDeadline()).isEqualTo(UPDATED_DEADLINE);
        assertThat(testWorkItem.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testWorkItem.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testWorkItem.getEstimatedEmployeeHours()).isEqualTo(UPDATED_ESTIMATED_EMPLOYEE_HOURS);
        assertThat(testWorkItem.getEstimatedMachineHours()).isEqualTo(UPDATED_ESTIMATED_MACHINE_HOURS);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkItem() throws Exception {
        int databaseSizeBeforeUpdate = workItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkItemMockMvc.perform(put("/api/work-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(workItem)))
            .andExpect(status().isBadRequest());

        // Validate the WorkItem in the database
        List<WorkItem> workItemList = workItemRepository.findAll();
        assertThat(workItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkItem() throws Exception {
        // Initialize the database
        workItemRepository.saveAndFlush(workItem);

        int databaseSizeBeforeDelete = workItemRepository.findAll().size();

        // Delete the workItem
        restWorkItemMockMvc.perform(delete("/api/work-items/{id}", workItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WorkItem> workItemList = workItemRepository.findAll();
        assertThat(workItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
