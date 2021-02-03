package com.tecdigital.tec.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Min(value = 0)
    @Column(name = "number")
    private Integer number;

    @Column(name = "acceptance_date")
    private LocalDate acceptanceDate;

    @Column(name = "shipping_date")
    private LocalDate shippingDate;

    @Column(name = "paid_date")
    private LocalDate paidDate;

    @Column(name = "close_date")
    private LocalDate closeDate;

    @Column(name = "extra_costs", precision = 21, scale = 2)
    private BigDecimal extraCosts;

    @Column(name = "extra_costs_description")
    private String extraCostsDescription;

    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<WorkItem> workItems = new HashSet<>();

    @OneToOne(mappedBy = "project")
    @JsonIgnore
    private Estimate estimate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public Project number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public LocalDate getAcceptanceDate() {
        return acceptanceDate;
    }

    public Project acceptanceDate(LocalDate acceptanceDate) {
        this.acceptanceDate = acceptanceDate;
        return this;
    }

    public void setAcceptanceDate(LocalDate acceptanceDate) {
        this.acceptanceDate = acceptanceDate;
    }

    public LocalDate getShippingDate() {
        return shippingDate;
    }

    public Project shippingDate(LocalDate shippingDate) {
        this.shippingDate = shippingDate;
        return this;
    }

    public void setShippingDate(LocalDate shippingDate) {
        this.shippingDate = shippingDate;
    }

    public LocalDate getPaidDate() {
        return paidDate;
    }

    public Project paidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
        return this;
    }

    public void setPaidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
    }

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public Project closeDate(LocalDate closeDate) {
        this.closeDate = closeDate;
        return this;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    public BigDecimal getExtraCosts() {
        return extraCosts;
    }

    public Project extraCosts(BigDecimal extraCosts) {
        this.extraCosts = extraCosts;
        return this;
    }

    public void setExtraCosts(BigDecimal extraCosts) {
        this.extraCosts = extraCosts;
    }

    public String getExtraCostsDescription() {
        return extraCostsDescription;
    }

    public Project extraCostsDescription(String extraCostsDescription) {
        this.extraCostsDescription = extraCostsDescription;
        return this;
    }

    public void setExtraCostsDescription(String extraCostsDescription) {
        this.extraCostsDescription = extraCostsDescription;
    }

    public Set<WorkItem> getWorkItems() {
        return workItems;
    }

    public Project workItems(Set<WorkItem> workItems) {
        this.workItems = workItems;
        return this;
    }

    public Project addWorkItems(WorkItem workItem) {
        this.workItems.add(workItem);
        workItem.setProject(this);
        return this;
    }

    public Project removeWorkItems(WorkItem workItem) {
        this.workItems.remove(workItem);
        workItem.setProject(null);
        return this;
    }

    public void setWorkItems(Set<WorkItem> workItems) {
        this.workItems = workItems;
    }

    public Estimate getEstimate() {
        return estimate;
    }

    public Project estimate(Estimate estimate) {
        this.estimate = estimate;
        return this;
    }

    public void setEstimate(Estimate estimate) {
        this.estimate = estimate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", acceptanceDate='" + getAcceptanceDate() + "'" +
            ", shippingDate='" + getShippingDate() + "'" +
            ", paidDate='" + getPaidDate() + "'" +
            ", closeDate='" + getCloseDate() + "'" +
            ", extraCosts=" + getExtraCosts() +
            ", extraCostsDescription='" + getExtraCostsDescription() + "'" +
            "}";
    }
}
