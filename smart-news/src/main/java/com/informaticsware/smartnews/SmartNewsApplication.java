package com.informaticsware.smartnews;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class SmartNewsApplication extends SpringBootServletInitializer {

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SmartNewsApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(SmartNewsApplication.class, args);
	}
}
