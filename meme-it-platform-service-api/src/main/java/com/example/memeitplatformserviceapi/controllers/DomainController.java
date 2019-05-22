package com.example.memeitplatformserviceapi.controllers;

import java.util.ArrayList;
import java.util.function.Predicate;

import com.example.memeitplatformserviceapi.models.Domain;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("domain")
public class DomainController {
    private final ArrayList<Domain> source = new ArrayList<>();
    private int counter = 0;

    @GetMapping("")
    public Domain[] requestAll() {
        return this.source.toArray(new Domain[0]);
    }

    @PostMapping("register")
    public String register(@RequestParam("name") String name, @RequestParam("address") String address) {
        if (isNullOrEmpty(name) || isNullOrEmpty(address)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (this.findDomainBy(domain -> domain.address.equals(address)) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Address already added.");
        }

        if (this.findDomainBy(domain -> domain.name.equals(name)) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name is already used.");
        }

        if (!address.startsWith("http://")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your address must start with 'http://'.");
        }

        if (address.endsWith("/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your address must NOT end with '/'.");
        }

        Domain domain = new Domain();
        domain.id = Integer.toString(++this.counter);
        domain.name = name;
        domain.address = address;
        this.source.add(domain);

        return domain.id;
    }

    @DeleteMapping("deregister/{id}")
    public void deregister(@PathVariable("id") String id) {
        Domain domainToDelete = this.findDomainBy(domain -> domain.id.equals(id));
        if (domainToDelete == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Domain does not exist.");
        }

        this.source.remove(domainToDelete);
    }

    private Domain findDomainBy(Predicate<Domain> predicate) {
        Domain result = null;
        for (Domain domain : this.source) {
            if (predicate.test(domain)) {
                result = domain;
                break;
            }
        }

        return result;
    }

    private static Boolean isNullOrEmpty(String string) {
        return string == null || "".equals(string);
    }
}
