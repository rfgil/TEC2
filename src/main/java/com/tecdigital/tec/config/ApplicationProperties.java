package com.tecdigital.tec.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to TEC 2.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
}
