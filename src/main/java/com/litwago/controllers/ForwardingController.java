package com.litwago.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {

    @RequestMapping("/**")
    public String forward() {
        return "forward:/";
    }
}
