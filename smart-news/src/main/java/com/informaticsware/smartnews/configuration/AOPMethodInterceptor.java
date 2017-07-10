package com.informaticsware.smartnews.configuration;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AOPMethodInterceptor {

    private static final Logger LOG = LoggerFactory.getLogger(AOPMethodInterceptor.class);
    
    private long milliSeconds = 0L;
	
	@Before("execution(* com.informaticsware.smartnews..*Repository.*(..))")
	public void beforeMethod(JoinPoint joinPoint) {
		milliSeconds = System.currentTimeMillis();
		LOG.info("AOP : Started: " + joinPoint);
	}

	@After("execution(* com.informaticsware.smartnews..*Repository.*(..))")
	public void afterMethod(JoinPoint joinPoint) {
		LOG.info("AOP : Completed: " + joinPoint);
		LOG.info("AOP : Execution Time: " + (System.currentTimeMillis() - milliSeconds) + "ms\n");
	}

}
