package com.institute.admin.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.institute.admin.model.Course;
import com.institute.admin.model.Message;
import com.institute.admin.model.Student;
import com.institute.admin.repository.CourseRepository;
import com.institute.admin.repository.MessageRepository;
import com.institute.admin.repository.StudentRepository;

@Service
public class AdminService {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public AdminService(CourseRepository courseRepository,
                        StudentRepository studentRepository,
                        MessageRepository messageRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.messageRepository = messageRepository;
    }

    // =========================
// COURSE MANAGEMENT
// =========================

public List<Course> getAllCourses() {
    return courseRepository.findAll();
}

public Optional<Course> getCourseById(Long id) {
    return courseRepository.findById(id);
}

public Course addCourse(Course course) {

    if (course.getName() == null || course.getName().isBlank()) {
        throw new IllegalArgumentException("Course name required");
    }

    return courseRepository.save(course);
}

public Course updateCourse(Long id, Course updatedCourse) {

    return courseRepository.findById(id).map(course -> {

        // 🔥 Update Name
        if (updatedCourse.getName() != null &&
            !updatedCourse.getName().isBlank()) {
            course.setName(updatedCourse.getName());
        }

        // 🔥 Update Description
        if (updatedCourse.getDescription() != null) {
            course.setDescription(updatedCourse.getDescription());
        }

        // 🔥 Update Duration
        if (updatedCourse.getDuration() != null &&
            !updatedCourse.getDuration().isBlank()) {
            course.setDuration(updatedCourse.getDuration());
        }

        // 🔥 Update Level
        if (updatedCourse.getLevel() != null &&
            !updatedCourse.getLevel().isBlank()) {
            course.setLevel(updatedCourse.getLevel());
        }

        // 🔥 Update Icon
        if (updatedCourse.getIcon() != null &&
            !updatedCourse.getIcon().isBlank()) {
            course.setIcon(updatedCourse.getIcon());
        }

        return courseRepository.save(course);

    }).orElseThrow(() ->
        new RuntimeException("Course not found with id " + id)
    );
}

public void deleteCourse(Long id) {

    if (!courseRepository.existsById(id)) {
        throw new RuntimeException("Course not found with id " + id);
    }

    courseRepository.deleteById(id);
}

    // =========================
    // STUDENT MANAGEMENT
    // =========================

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student addStudent(Student student) {

        if (student.getName() == null || student.getName().isBlank()) {
            throw new IllegalArgumentException("Student name required");
        }

        if (student.getEmail() == null || student.getEmail().isBlank()) {
            throw new IllegalArgumentException("Student email required");
        }

        if (student.getStatus() == null || student.getStatus().isBlank()) {
            student.setStatus("ACTIVE");
        }

        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {

        return studentRepository.findById(id).map(student -> {

            if (updatedStudent.getName() != null &&
                !updatedStudent.getName().isBlank()) {
                student.setName(updatedStudent.getName());
            }

            if (updatedStudent.getEmail() != null &&
                !updatedStudent.getEmail().isBlank()) {
                student.setEmail(updatedStudent.getEmail());
            }

            if (updatedStudent.getStatus() != null &&
                !updatedStudent.getStatus().isBlank()) {
                student.setStatus(updatedStudent.getStatus());
            }

            return studentRepository.save(student);

        }).orElseThrow(() ->
            new RuntimeException("Student not found with id " + id)
        );
    }

    public void deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id " + id);
        }

        studentRepository.deleteById(id);
    }

    // =========================
    // MESSAGE MANAGEMENT
    // =========================

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Message addMessage(Message message) {

        if (message.getSenderName() == null ||
            message.getSenderName().isBlank()) {
            throw new IllegalArgumentException("Sender name required");
        }

        if (message.getEmail() == null ||
            message.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email required");
        }

        if (message.getContent() == null ||
            message.getContent().isBlank()) {
            throw new IllegalArgumentException("Message content required");
        }

        return messageRepository.save(message);
    }

    public void deleteMessage(Long id) {

        if (!messageRepository.existsById(id)) {
            throw new RuntimeException("Message not found with id " + id);
        }

        messageRepository.deleteById(id);
    }
}
