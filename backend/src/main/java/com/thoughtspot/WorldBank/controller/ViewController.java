package com.thoughtspot.WorldBank.controller;

import com.thoughtspot.WorldBank.model.View;
import com.thoughtspot.WorldBank.service.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ViewController {
    private final ViewService viewService;

    @Autowired
    public ViewController(ViewService viewService) {
        this.viewService = viewService;
    }

    @PostMapping("/view")
    public ResponseEntity<View> createView(@RequestBody View view) {
        try {
            View createdView = viewService.createView(view);
            return new ResponseEntity<>(createdView, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/view")
    public ResponseEntity<List<View>> getAllViews() {
        try {
            List<View> views = viewService.getAllViews();
            return new ResponseEntity<>(views, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/view/{viewId}")
    public ResponseEntity<View> getViewById(@PathVariable Long viewId) {
        View view = viewService.getViewById(viewId);
        if (view != null) {
            return new ResponseEntity<>(view, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/view/{viewId}")
    public ResponseEntity<Void> deleteView(@PathVariable Long viewId) {
        try {
            viewService.deleteView(viewId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}