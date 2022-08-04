package com.example.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.model.Book;

public interface BookDAO extends MongoRepository<Book, Integer>{

}