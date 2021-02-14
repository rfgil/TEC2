package com.tecdigital.tec.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.tecdigital.tec.domain.enumeration.WorkItemStatus;

import com.tecdigital.tec.domain.enumeration.WorkItemType;

/**
 * A WorkItem.
 */
@Entity
@Table(name = "work_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WorkItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Min(value = 0)
    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "reference")
    private String reference;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private WorkItemStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private WorkItemType type;

    @Min(value = 0)
    @Column(name = "estimated_employee_hours")
    private Integer estimatedEmployeeHours;

    @Min(value = 0)
    @Column(name = "estimated_machine_hours")
    private Integer estimatedMachineHours;

    @OneToOne
    @JoinColumn(unique = true)
    private User assignedUser;

    @OneToMany(mappedBy = "workItem")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<WorkItem> childWorkItems = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "workItems", allowSetters = true)
    private Estimate estimate;

    @ManyToOne
    @JsonIgnoreProperties(value = "workItems", allowSetters = true)
    private Project project;

    @ManyToOne
    @JsonIgnoreProperties(value = "childWorkItems", allowSetters = true)
    private WorkItem workItem;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public WorkItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getReference() {
        return reference;
    }

    public WorkItem reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public WorkItem deadline(LocalDate deadline) {
        this.deadline = deadline;
        return this;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public WorkItemStatus getStatus() {
        return status;
    }

    public WorkItem status(WorkItemStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(WorkItemStatus status) {
        this.status = status;
    }

    public WorkItemType getType() {
        return type;
    }

    public WorkItem type(WorkItemType type) {
        this.type = type;
        return this;
    }

    public void setType(WorkItemType type) {
        this.type = type;
    }

    public Integer getEstimatedEmployeeHours() {
        return estimatedEmployeeHours;
    }

    public WorkItem estimatedEmployeeHours(Integer estimatedEmployeeHours) {
        this.estimatedEmployeeHours = estimatedEmployeeHours;
        return this;
    }

    public void setEstimatedEmployeeHours(Integer estimatedEmployeeHours) {
        this.estimatedEmployeeHours = estimatedEmployeeHours;
    }

    public Integer getEstimatedMachineHours() {
        return estimatedMachineHours;
    }

    public WorkItem estimatedMachineHours(Integer estimatedMachineHours) {
        this.estimatedMachineHours = estimatedMachineHours;
        return this;
    }

    public void setEstimatedMachineHours(Integer estimatedMachineHours) {
        this.estimatedMachineHours = estimatedMachineHours;
    }

    public User getAssignedUser() {
        return assignedUser;
    }

    public WorkItem assignedUser(User user) {
        this.assignedUser = user;
        return this;
    }

    public void setAssignedUser(User user) {
        this.assignedUser = user;
    }

    public Set<WorkItem> getChildWorkItems() {
        return childWorkItems;
    }

    public WorkItem childWorkItems(Set<WorkItem> workItems) {
        this.childWorkItems = workItems;
        return this;
    }

    public WorkItem addChildWorkItems(WorkItem workItem) {
        this.childWorkItems.add(workItem);
        workItem.setWorkItem(this);
        return this;
    }

    public WorkItem removeChildWorkItems(WorkItem workItem) {
        this.childWorkItems.remove(workItem);
        workItem.setWorkItem(null);
        return this;
    }

    public void setChildWorkItems(Set<WorkItem> workItems) {
        this.childWorkItems = workItems;
    }

    public Estimate getEstimate() {
        return estimate;
    }

    public WorkItem estimate(Estimate estimate) {
        this.estimate = estimate;
        return this;
    }

    public void setEstimate(Estimate estimate) {
        this.estimate = estimate;
    }

    public Project getProject() {
        return project;
    }

    public WorkItem project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public WorkItem getWorkItem() {
        return workItem;
    }

    public WorkItem workItem(WorkItem workItem) {
        this.workItem = workItem;
        return this;
    }

    public void setWorkItem(WorkItem workItem) {
        this.workItem = workItem;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkItem)) {
            return false;
        }
        return id != null && id.equals(((WorkItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WorkItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", reference='" + getReference() + "'" +
            ", deadline='" + getDeadline() + "'" +
            ", status='" + getStatus() + "'" +
            ", type='" + getType() + "'" +
            ", estimatedEmployeeHours=" + getEstimatedEmployeeHours() +
            ", estimatedMachineHours=" + getEstimatedMachineHours() +
            "}";
    }
}
