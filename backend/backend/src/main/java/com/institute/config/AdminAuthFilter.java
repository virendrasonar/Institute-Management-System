package com.institute.config;

import java.io.IOException;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.institute.admin.services.AdminAuthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@ConditionalOnProperty(name = "app.admin.auth.enabled", havingValue = "true")
public class AdminAuthFilter extends OncePerRequestFilter {
    private final AdminAuthService authService;

    public AdminAuthFilter(AdminAuthService authService) {
        this.authService = authService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return "OPTIONS".equalsIgnoreCase(request.getMethod())
                || !path.startsWith("/admin/")
                || path.equals("/admin/auth/login");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        String token = authorization != null && authorization.startsWith("Bearer ")
                ? authorization.substring(7) : null;
        if (!authService.isValid(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Admin authentication required");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
