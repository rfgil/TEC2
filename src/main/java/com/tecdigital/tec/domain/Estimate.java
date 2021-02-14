package com.tecdigital.tec.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.tecdigital.tec.domain.enumeration.EstimateStatus;

/**
 * A Estimate.
 */
@Entity
@Table(name = "estimate")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Estimate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Min(value = 0)
    @Column(name = "number")
    private Integer number;

    @Min(value = 0)
    @Column(name = "version")
    private Integer version;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EstimateStatus status;

    @NotNull
    @Column(name = "customer_id", nullable = false)
    private Integer customerId;

    @Column(name = "reference")
    private String reference;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "maturity")
    private Integer maturity;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @DecimalMin(value = "0")
    @DecimalMax(value = "1")
    @Column(name = "profit_margin", precision = 21, scale = 2)
    private BigDecimal profitMargin;

    @DecimalMin(value = "0")
    @DecimalMax(value = "1")
    @Column(name = "commission", precision = 21, scale = 2)
    private BigDecimal commission;

    @DecimalMin(value = "0")
    @DecimalMax(value = "1")
    @Column(name = "discount", precision = 21, scale = 2)
    private BigDecimal discount;

    @Column(name = "delivery_method_id")
    private Integer deliveryMethodId;

    @Column(name = "delivery_datetime")
    private LocalDate deliveryDatetime;

    @Column(name = "notes")
    private String notes;

    @OneToOne
    @JoinColumn(unique = true)
    private Project project;

    @OneToMany(mappedBy = "estimate")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Estimate> versions = new HashSet<>();

    @OneToMany(mappedBy = "estimate")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<WorkItem> workItems = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "versions", allowSetters = true)
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

    public Estimate number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getVersion() {
        return version;
    }

    public Estimate version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public EstimateStatus getStatus() {
        return status;
    }

    public Estimate status(EstimateStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(EstimateStatus status) {
        this.status = status;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public Estimate customerId(Integer customerId) {
        this.customerId = customerId;
        return this;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getReference() {
        return reference;
    }

    public Estimate reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDate() {
        return date;
    }

    public Estimate date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getMaturity() {
        return maturity;
    }

    public Estimate maturity(Integer maturity) {
        this.maturity = maturity;
        return this;
    }

    public void setMaturity(Integer maturity) {
        this.maturity = maturity;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public Estimate expirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
        return this;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public BigDecimal getProfitMargin() {
        return profitMargin;
    }

    public Estimate profitMargin(BigDecimal profitMargin) {
        this.profitMargin = profitMargin;
        return this;
    }

    public void setProfitMargin(BigDecimal profitMargin) {
        this.profitMargin = profitMargin;
    }

    public BigDecimal getCommission() {
        return commission;
    }

    public Estimate commission(BigDecimal commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(BigDecimal commission) {
        this.commission = commission;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public Estimate discount(BigDecimal discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public Integer getDeliveryMethodId() {
        return deliveryMethodId;
    }

    public Estimate deliveryMethodId(Integer deliveryMethodId) {
        this.deliveryMethodId = deliveryMethodId;
        return this;
    }

    public void setDeliveryMethodId(Integer deliveryMethodId) {
        this.deliveryMethodId = deliveryMethodId;
    }

    public LocalDate getDeliveryDatetime() {
        return deliveryDatetime;
    }

    public Estimate deliveryDatetime(LocalDate deliveryDatetime) {
        this.deliveryDatetime = deliveryDatetime;
        return this;
    }

    public void setDeliveryDatetime(LocalDate deliveryDatetime) {
        this.deliveryDatetime = deliveryDatetime;
    }

    public String getNotes() {
        return notes;
    }

    public Estimate notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Project getProject() {
        return project;
    }

    public Estimate project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<Estimate> getVersions() {
        return versions;
    }

    public Estimate versions(Set<Estimate> estimates) {
        this.versions = estimates;
        return this;
    }

    public Estimate addVersions(Estimate estimate) {
        this.versions.add(estimate);
        estimate.setEstimate(this);
        return this;
    }

    public Estimate removeVersions(Estimate estimate) {
        this.versions.remove(estimate);
        estimate.setEstimate(null);
        return this;
    }

    public void setVersions(Set<Estimate> estimates) {
        this.versions = estimates;
    }

    public Set<WorkItem> getWorkItems() {
        return workItems;
    }

    public Estimate workItems(Set<WorkItem> workItems) {
        this.workItems = workItems;
        return this;
    }

    public Estimate addWorkItems(WorkItem workItem) {
        this.workItems.add(workItem);
        workItem.setEstimate(this);
        return this;
    }

    public Estimate removeWorkItems(WorkItem workItem) {
        this.workItems.remove(workItem);
        workItem.setEstimate(null);
        return this;
    }

    public void setWorkItems(Set<WorkItem> workItems) {
        this.workItems = workItems;
    }

    public Estimate getEstimate() {
        return estimate;
    }

    public Estimate estimate(Estimate estimate) {
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
        if (!(o instanceof Estimate)) {
            return false;
        }
        return id != null && id.equals(((Estimate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Estimate{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", version=" + getVersion() +
            ", status='" + getStatus() + "'" +
            ", customerId=" + getCustomerId() +
            ", reference='" + getReference() + "'" +
            ", date='" + getDate() + "'" +
            ", maturity=" + getMaturity() +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", profitMargin=" + getProfitMargin() +
            ", commission=" + getCommission() +
            ", discount=" + getDiscount() +
            ", deliveryMethodId=" + getDeliveryMethodId() +
            ", deliveryDatetime='" + getDeliveryDatetime() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
