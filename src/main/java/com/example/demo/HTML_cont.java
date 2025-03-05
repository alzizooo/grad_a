package com.example.demo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class HTML_cont {
    @GetMapping("/")
    public String index() {
        return "index"; // Refers to index.html in templates
    }

    @GetMapping("/about")
    public String about() {
        return "about"; // Refers to about.html in templates
    }
}
