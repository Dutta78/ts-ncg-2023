package com.thoughtspot.WorldBank.service;

import com.thoughtspot.WorldBank.model.View;

import com.thoughtspot.WorldBank.repository.ViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewService {
    private final ViewRepository viewRepository;

    @Autowired
    public ViewService(ViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    public View createView(View view) {
        return viewRepository.save(view);
    }

    public List<View> getAllViews() {
        return viewRepository.findAll();
    }

    public View getViewById(Long viewId) {
        return viewRepository.findById(viewId)
                .orElse(null);
    }

    public void deleteView(Long viewId) {
        viewRepository.deleteById(viewId);
    }
}