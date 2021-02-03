package com.tecdigital.tec.web.rest;

import com.tecdigital.tec.Tec2App;
import com.tecdigital.tec.domain.Project;
import com.tecdigital.tec.repository.ProjectRepository;

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

/**
 * Integration tests for the {@link ProjectResource} REST controller.
 */
@SpringBootTest(classes = Tec2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProjectResourceIT {

    private static final Integer DEFAULT_NUMBER = 0;
    private static final Integer UPDATED_NUMBER = 1;

    private static final LocalDate DEFAULT_ACCEPTANCE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ACCEPTANCE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_SHIPPING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SHIPPING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PAID_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PAID_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_CLOSE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CLOSE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_EXTRA_COSTS = new BigDecimal(1);
    private static final BigDecimal UPDATED_EXTRA_COSTS = new BigDecimal(2);

    private static final String DEFAULT_EXTRA_COSTS_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_EXTRA_COSTS_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjectMockMvc;

    private Project project;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Project createEntity(EntityManager em) {
        Project project = new Project()
            .number(DEFAULT_NUMBER)
            .acceptanceDate(DEFAULT_ACCEPTANCE_DATE)
            .shippingDate(DEFAULT_SHIPPING_DATE)
            .paidDate(DEFAULT_PAID_DATE)
            .closeDate(DEFAULT_CLOSE_DATE)
            .extraCosts(DEFAULT_EXTRA_COSTS)
            .extraCostsDescription(DEFAULT_EXTRA_COSTS_DESCRIPTION);
        return project;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Project createUpdatedEntity(EntityManager em) {
        Project project = new Project()
            .number(UPDATED_NUMBER)
            .acceptanceDate(UPDATED_ACCEPTANCE_DATE)
            .shippingDate(UPDATED_SHIPPING_DATE)
            .paidDate(UPDATED_PAID_DATE)
            .closeDate(UPDATED_CLOSE_DATE)
            .extraCosts(UPDATED_EXTRA_COSTS)
            .extraCostsDescription(UPDATED_EXTRA_COSTS_DESCRIPTION);
        return project;
    }

    @BeforeEach
    public void initTest() {
        project = createEntity(em);
    }

    @Test
    @Transactional
    public void createProject() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();
        // Create the Project
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isCreated());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate + 1);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testProject.getAcceptanceDate()).isEqualTo(DEFAULT_ACCEPTANCE_DATE);
        assertThat(testProject.getShippingDate()).isEqualTo(DEFAULT_SHIPPING_DATE);
        assertThat(testProject.getPaidDate()).isEqualTo(DEFAULT_PAID_DATE);
        assertThat(testProject.getCloseDate()).isEqualTo(DEFAULT_CLOSE_DATE);
        assertThat(testProject.getExtraCosts()).isEqualTo(DEFAULT_EXTRA_COSTS);
        assertThat(testProject.getExtraCostsDescription()).isEqualTo(DEFAULT_EXTRA_COSTS_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project with an existing ID
        project.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProjects() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get all the projectList
        restProjectMockMvc.perform(get("/api/projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(project.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].acceptanceDate").value(hasItem(DEFAULT_ACCEPTANCE_DATE.toString())))
            .andExpect(jsonPath("$.[*].shippingDate").value(hasItem(DEFAULT_SHIPPING_DATE.toString())))
            .andExpect(jsonPath("$.[*].paidDate").value(hasItem(DEFAULT_PAID_DATE.toString())))
            .andExpect(jsonPath("$.[*].closeDate").value(hasItem(DEFAULT_CLOSE_DATE.toString())))
            .andExpect(jsonPath("$.[*].extraCosts").value(hasItem(DEFAULT_EXTRA_COSTS.intValue())))
            .andExpect(jsonPath("$.[*].extraCostsDescription").value(hasItem(DEFAULT_EXTRA_COSTS_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", project.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(project.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.acceptanceDate").value(DEFAULT_ACCEPTANCE_DATE.toString()))
            .andExpect(jsonPath("$.shippingDate").value(DEFAULT_SHIPPING_DATE.toString()))
            .andExpect(jsonPath("$.paidDate").value(DEFAULT_PAID_DATE.toString()))
            .andExpect(jsonPath("$.closeDate").value(DEFAULT_CLOSE_DATE.toString()))
            .andExpect(jsonPath("$.extraCosts").value(DEFAULT_EXTRA_COSTS.intValue()))
            .andExpect(jsonPath("$.extraCostsDescription").value(DEFAULT_EXTRA_COSTS_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingProject() throws Exception {
        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Update the project
        Project updatedProject = projectRepository.findById(project.getId()).get();
        // Disconnect from session so that the updates on updatedProject are not directly saved in db
        em.detach(updatedProject);
        updatedProject
            .number(UPDATED_NUMBER)
            .acceptanceDate(UPDATED_ACCEPTANCE_DATE)
            .shippingDate(UPDATED_SHIPPING_DATE)
            .paidDate(UPDATED_PAID_DATE)
            .closeDate(UPDATED_CLOSE_DATE)
            .extraCosts(UPDATED_EXTRA_COSTS)
            .extraCostsDescription(UPDATED_EXTRA_COSTS_DESCRIPTION);

        restProjectMockMvc.perform(put("/api/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProject)))
            .andExpect(status().isOk());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testProject.getAcceptanceDate()).isEqualTo(UPDATED_ACCEPTANCE_DATE);
        assertThat(testProject.getShippingDate()).isEqualTo(UPDATED_SHIPPING_DATE);
        assertThat(testProject.getPaidDate()).isEqualTo(UPDATED_PAID_DATE);
        assertThat(testProject.getCloseDate()).isEqualTo(UPDATED_CLOSE_DATE);
        assertThat(testProject.getExtraCosts()).isEqualTo(UPDATED_EXTRA_COSTS);
        assertThat(testProject.getExtraCostsDescription()).isEqualTo(UPDATED_EXTRA_COSTS_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingProject() throws Exception {
        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectMockMvc.perform(put("/api/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(project)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        int databaseSizeBeforeDelete = projectRepository.findAll().size();

        // Delete the project
        restProjectMockMvc.perform(delete("/api/projects/{id}", project.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
