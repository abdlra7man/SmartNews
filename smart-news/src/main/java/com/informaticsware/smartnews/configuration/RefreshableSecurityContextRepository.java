package com.informaticsware.smartnews.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by abdelrahman on 26/06/17.
 */
@Component
public class RefreshableSecurityContextRepository extends HttpSessionSecurityContextRepository {

    private static Logger logger = LoggerFactory.getLogger(RefreshableSecurityContextRepository.class);

    @Autowired
    private DataSource dataSource;
    private static final String authoritiesQuery = " SELECT r.role AS role "
            + " FROM   roles r "
            + " JOIN   users_roles ur on r.id = ur.role_id "
            + " JOIN   users u ON ur.user_id = u.id "
            + " WHERE  u.username = ?  AND u.removed = 'N' AND u.disabled = 'N'";

    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {

        SecurityContext context = super.loadContext(requestResponseHolder);

        Authentication authentication = context.getAuthentication();

        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UsernamePasswordAuthenticationToken newAuthentication = new UsernamePasswordAuthenticationToken(userDetails, authentication.getCredentials(), getUserAuthorities(userDetails));
            context.setAuthentication(newAuthentication);
        }
        return context;
    }

    private List<SimpleGrantedAuthority> getUserAuthorities(UserDetails userDetails) {
        Connection conn = null;
        PreparedStatement stmt = null;
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        try {
            conn = dataSource.getConnection();
            stmt = conn.prepareStatement(authoritiesQuery);
            stmt.setString(1, userDetails.getUsername());
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                String authority = rs.getString("role");
                authorities.add(new SimpleGrantedAuthority(authority));
            }
        } catch (SQLException se) {
            logger.error("Error retrieving user authorities from database", se);
        } catch (Exception e) {
            logger.error("Error retrieving user authorities", e);
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException sqlException) {
                logger.error("Error closing prepared statement for retrieving user authorities", sqlException);
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException sqlException) {
                logger.error("Error closing connection for retrieving user authorities", sqlException);
            }
        }
        return authorities;
    }
}