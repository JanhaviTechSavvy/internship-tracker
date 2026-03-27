package com.internshiptracker.controller;

import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api")

public class HelloController {

    // ✅ Health check ONLY
    @GetMapping("/health")
    public String health() {
        return "Internship Tracker API is healthy 🚀";
    }
}