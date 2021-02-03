package com.tecdigital.tec.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tecdigital.tec.web.rest.TestUtil;

public class WorkItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkItem.class);
        WorkItem workItem1 = new WorkItem();
        workItem1.setId(1L);
        WorkItem workItem2 = new WorkItem();
        workItem2.setId(workItem1.getId());
        assertThat(workItem1).isEqualTo(workItem2);
        workItem2.setId(2L);
        assertThat(workItem1).isNotEqualTo(workItem2);
        workItem1.setId(null);
        assertThat(workItem1).isNotEqualTo(workItem2);
    }
}
