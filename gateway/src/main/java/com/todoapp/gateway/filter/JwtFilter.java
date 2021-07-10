package com.todoapp.gateway.filter;


import com.todoapp.gateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Locale;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtility;


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        if(!httpServletRequest.getRequestURI().endsWith("login") &&
                !httpServletRequest.getRequestURI().equals("/user/create") &&
        !httpServletRequest.getMethod().toLowerCase(Locale.ROOT).equals("options")) {
            String authorization = httpServletRequest.getHeader("Authorization");
            String token = null;
            String userName = null;
            if (null != authorization && authorization.startsWith("Bearer ")) {
                token = authorization.substring(7);
                if (jwtUtility.validateToken(token)) {
                    userName = jwtUtility.getUsernameFromToken(token);

                    UserDetails userDetails = new User(userName, "ab", new ArrayList<>());
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                            = new UsernamePasswordAuthenticationToken(userDetails,
                            null, userDetails.getAuthorities());

                    usernamePasswordAuthenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)
                    );

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }else{
                    httpServletResponse.sendError(403,"Invalid Token!");
                    return;
                }
            }else {
                httpServletResponse.sendError(400,"No Token!");
                return;
            }

        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }
}