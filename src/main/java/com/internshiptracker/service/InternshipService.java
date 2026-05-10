package com.internshiptracker.service;

import com.internshiptracker.entity.Internship;
import com.internshiptracker.repository.InternshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternshipService {

    private final InternshipRepository repository;

    public InternshipService(InternshipRepository repository) {
        this.repository = repository;
    }

    public Internship createInternship(Internship internship) {
        return repository.save(internship);
    }

    public List<Internship> getAllInternships() {
        return repository.findAll();
    }

    public Internship getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public Internship updateInternship(Long id, Internship updated) {
        Internship internship = getById(id);

        internship.setCompanyName(updated.getCompanyName());
        internship.setRole(updated.getRole());
        internship.setStatus(updated.getStatus());

        return repository.save(internship);
    }

    public void deleteInternship(Long id) {
        repository.deleteById(id);
    }
}