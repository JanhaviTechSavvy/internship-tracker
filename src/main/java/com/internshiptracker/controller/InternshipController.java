package com.internshiptracker.controller;

import com.internshiptracker.entity.Internship;
import com.internshiptracker.service.InternshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")

@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://6a0c541---beamish-praline-7bf604.netlify.app"
})
public class InternshipController {

    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }

    // ✅ POST
    @PostMapping
    public Internship createInternship(@RequestBody Internship internship) {
        return service.createInternship(internship);
    }

    // ✅ GET all
    @GetMapping
    public List<Internship> getAllInternships() {
        return service.getAllInternships();
    }

    // ✅ GET by ID
    @GetMapping("/{id}")
    public Internship getInternshipById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Internship updateInternship(@PathVariable Long id,
                                       @RequestBody Internship updated) {
        return service.updateInternship(id, updated);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteInternship(@PathVariable Long id) {
        service.deleteInternship(id);
    }
}