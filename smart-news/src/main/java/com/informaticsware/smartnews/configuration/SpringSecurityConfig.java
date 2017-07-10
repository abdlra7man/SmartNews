package com.informaticsware.smartnews.configuration;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableAutoConfiguration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private DataSource dataSource;
	
    @Autowired
    private SmartNewsAccessDeniedHandler accessDeniedHandler;

    @Autowired
	private RefreshableSecurityContextRepository refreshableSecurityContextRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

    	http.csrf().disable()		//if you want to enable refreshing authorities at runtime use : .securityContext().securityContextRepository(refreshableSecurityContextRepository)
            .authorizeRequests()
				.antMatchers("/**").permitAll()
//				.antMatchers("/", "/home", "/about").permitAll()
//				.antMatchers("/admin/**").hasAnyAuthority("news_admin")
//				.antMatchers("/user/**").hasAnyAuthority("news_user", "news_admin")
//				.antMatchers("/api/v1/admin/**").hasAnyAuthority("news_admin")
//				.antMatchers("/api/v1/user/**").hasAnyAuthority("news_user", "news_admin")
//				.anyRequest().authenticated()
//				.and().exceptionHandling().authenticationEntryPoint((httpServletRequest, httpServletResponse, e) -> httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
            .and()
            	.formLogin()
				.loginPage("/login")
				.permitAll()
				.failureHandler((httpServletRequest, httpServletResponse, e) -> httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
			.and()
				.logout()
				.permitAll()
			.and()
            	.exceptionHandling().accessDeniedHandler(accessDeniedHandler);
    }

    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {

        String usersQuery = " SELECT username, password , IF(disabled = 'N', 1, 0) AS enabled "
				+ " FROM   users "
				+ " WHERE  username = ? ";

		String authoritiesQuery = " SELECT u.username, r.name AS role "
				+ " FROM   roles r "
				+ " JOIN   users_roles ur on ur.role_id = r.id "
				+ " JOIN   users u ON ur.user_id = u.id "
				+ " WHERE  u.username = ? AND u.removed = 'N' AND u.disabled = 'N'";
        
		auth.jdbcAuthentication()
			.dataSource(dataSource)
			.passwordEncoder(new BCryptPasswordEncoder())
			.usersByUsernameQuery(usersQuery)
			.authoritiesByUsernameQuery(authoritiesQuery)
		;
    }
}