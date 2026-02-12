package com.institute.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.institute.admin.model.Message;
import com.institute.admin.model.Student;
import com.institute.admin.repository.MessageRepository;
import com.institute.admin.repository.StudentRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample students if none exist
        if (studentRepository.count() == 0) {
            initializeStudents();
        }

        // Initialize sample messages if none exist
        if (messageRepository.count() == 0) {
            initializeMessages();
        }
    }

    private void initializeStudents() {
       Student student1 = new Student("Aarav Sharma", "aarav.sharma@gmail.com", "ACTIVE");
Student student2 = new Student("Vivaan Patel", "vivaan.patel@gmail.com", "ACTIVE");
Student student3 = new Student("Ananya Gupta", "ananya.gupta@gmail.com", "ACTIVE");
Student student4 = new Student("Ishaan Verma", "ishaan.verma@gmail.com", "ACTIVE");
Student student5 = new Student("Diya Reddy", "diya.reddy@gmail.com", "ACTIVE");
Student student6 = new Student("Aditya Singh", "aditya.singh@gmail.com", "ACTIVE");
Student student7 = new Student("Kavya Nair", "kavya.nair@gmail.com", "ACTIVE");
Student student8 = new Student("Rohan Kulkarni", "rohan.kulkarni@gmail.com", "ACTIVE");


        studentRepository.save(student1);
        studentRepository.save(student2);
        studentRepository.save(student3);
        studentRepository.save(student4);
        studentRepository.save(student5);
        studentRepository.save(student6);
        studentRepository.save(student7);
        studentRepository.save(student8);

        System.out.println("✅ Initialized " + studentRepository.count() + " sample students");
    }

    private void initializeMessages() {
        Message message1 = new Message("Aarav Sharma", "aarav.sharma@email.com", 
        "Hello! I'm interested in enrolling in the Advanced JavaScript course. Could you please provide more information about the prerequisites and schedule?");

Message message2 = new Message("Priya Patel", "priya.patel@email.com", 
        "I'm having trouble accessing the course materials. Could someone help me with the login process?");

Message message3 = new Message("Rohan Mehta", "rohan.mehta@email.com", 
        "Thank you for the excellent Spring Boot course! The content was very comprehensive and well-structured. I would love to see more advanced topics covered.");

Message message4 = new Message("Liam Anderson", "liam.anderson@email.com", 
        "Is there a mobile app available for accessing course content? It would be great to study on the go.");

Message message5 = new Message("Sofia Martinez", "sofia.martinez@email.com", 
        "I'm interested in the upcoming React course. When will registration open and what are the fees?");


        messageRepository.save(message1);
        messageRepository.save(message2);
        messageRepository.save(message3);
        messageRepository.save(message4);
        messageRepository.save(message5);

        System.out.println("✅ Initialized " + messageRepository.count() + " sample messages");
    }
}