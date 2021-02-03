package com.tecdigital.tec.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tecdigital.tec.web.rest.TestUtil;

public class EstimateTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estimate.class);
        Estimate estimate1 = new Estimate();
        estimate1.setId(1L);
        Estimate estimate2 = new Estimate();
        estimate2.setId(estimate1.getId());
        assertThat(estimate1).isEqualTo(estimate2);
        estimate2.setId(2L);
        assertThat(estimate1).isNotEqualTo(estimate2);
        estimate1.setId(null);
        assertThat(estimate1).isNotEqualTo(estimate2);
    }
}
