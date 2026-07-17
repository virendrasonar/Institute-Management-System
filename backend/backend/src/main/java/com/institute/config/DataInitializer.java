package com.institute.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.institute.admin.model.Message;
import com.institute.admin.model.Course;
import com.institute.admin.model.Student;
import com.institute.admin.repository.CourseRepository;
import com.institute.admin.repository.MessageRepository;
import com.institute.admin.repository.StudentRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private CourseRepository courseRepository;

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

        initializeCourses();
    }

    private void initializeCourses() {
        List<CourseSeed> catalog = List.of(
            new CourseSeed(
                "Modern Java & Spring Boot: Job-Ready Backend Development",
                "Build production-ready Java applications with modern Java, object-oriented design, Spring Boot, REST APIs, JPA, security, testing, Docker, and deployment. You will finish with a portfolio-grade institute management API.",
                "16 weeks", "Intermediate", "code", "Software Development", new BigDecimal("7999"),
                "Basic programming knowledge\nA laptop with 8 GB RAM\nNo prior Spring experience required",
                "Modern Java and clean OOP\nSpring Boot REST API development\nJPA, Hibernate, and MySQL\nJWT security and role-based access\nJUnit and integration testing\nDocker and cloud deployment",
                "Ananya Rao", 4.9, 1840,
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                "Java foundations and modern language features\nObject-oriented design and SOLID principles\nSpring Boot fundamentals\nREST API design and validation\nMySQL with Spring Data JPA\nAuthentication and authorization\nTesting with JUnit and Mockito\nDocker deployment\nCapstone: production-ready backend"
            ),
            new CourseSeed(
                "AI Engineering with Python",
                "Learn Python, machine learning, deep learning, model evaluation, APIs, and MLOps by building intelligent applications from real-world datasets.",
                "20 weeks", "Intermediate", "psychology", "Artificial Intelligence", new BigDecimal("8999"),
                "Basic Python is helpful\nHigh-school mathematics",
                "Python for AI workflows\nSupervised and unsupervised learning\nNeural networks with PyTorch\nModel evaluation and responsible AI\nServing models with FastAPI\nMLOps foundations",
                "Dr. Meera Iyer", 4.9, 2310,
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
                "Python and NumPy refresher\nData preparation and feature engineering\nMachine learning algorithms\nDeep learning with PyTorch\nComputer vision and NLP\nResponsible AI\nModel APIs and deployment\nCapstone: intelligent product"
            ),
            new CourseSeed(
                "Generative AI & LLM Application Development",
                "Create useful generative AI products with prompt design, retrieval-augmented generation, agents, evaluation, guardrails, and production deployment.",
                "12 weeks", "Intermediate", "auto_awesome", "Generative AI", new BigDecimal("8499"),
                "Comfort with Python or JavaScript\nBasic API knowledge",
                "Prompt and context engineering\nRAG with vector search\nTool-using AI agents\nLLM evaluation and safety\nCost, latency, and quality optimization\nProduction AI capstone",
                "Arjun Menon", 4.8, 2760,
                "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
                "How modern LLMs work\nPrompt and context engineering\nEmbeddings and vector databases\nProduction RAG systems\nAgents and tool use\nEvaluation, observability, and guardrails\nCapstone: deploy an AI assistant"
            ),
            new CourseSeed(
                "Full-Stack Development with React & Node.js",
                "Design and deploy responsive web products using TypeScript, React, Node.js, PostgreSQL, authentication, testing, and modern cloud workflows.",
                "18 weeks", "Intermediate", "devices", "Web Development", new BigDecimal("7499"),
                "Basic HTML and CSS\nNo professional experience required",
                "TypeScript from fundamentals\nAccessible React interfaces\nNode.js and Express APIs\nPostgreSQL data modeling\nAuthentication and testing\nCI/CD and deployment",
                "Kabir Sharma", 4.8, 1985,
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
                "Modern HTML, CSS, and TypeScript\nReact components and state\nNode.js REST APIs\nPostgreSQL and ORM workflows\nAuthentication and authorization\nAutomated testing\nCloud deployment\nCapstone: full-stack SaaS"
            ),
            new CourseSeed(
                "Data Science & Machine Learning",
                "Turn raw data into decisions with Python, SQL, statistics, visualization, machine learning, dashboards, and an end-to-end analytics portfolio.",
                "20 weeks", "Beginner", "analytics", "Data Science", new BigDecimal("7999"),
                "Comfort with basic mathematics\nNo coding experience required",
                "Python, pandas, and SQL\nStatistics for decision-making\nData visualization and storytelling\nPredictive machine learning\nExperiment design\nPortfolio-ready case studies",
                "Priya Nair", 4.8, 2150,
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                "Python for data analysis\nSQL and relational data\nStatistics and probability\nExploratory data analysis\nVisualization and dashboards\nMachine learning foundations\nModel evaluation\nCapstone: business insight project"
            ),
            new CourseSeed(
                "Cloud & DevOps Engineering",
                "Master Linux, Git, Docker, Kubernetes, CI/CD, infrastructure as code, observability, and secure AWS deployment through hands-on labs.",
                "16 weeks", "Intermediate", "cloud", "Cloud & DevOps", new BigDecimal("8499"),
                "Basic command-line knowledge\nGeneral networking concepts",
                "Linux and networking essentials\nDocker and Kubernetes\nCI/CD pipelines\nTerraform infrastructure as code\nAWS deployment patterns\nMonitoring and incident response",
                "Vikram Desai", 4.7, 1420,
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                "Linux and Git workflows\nNetworking foundations\nContainers with Docker\nKubernetes orchestration\nCI/CD automation\nTerraform and AWS\nObservability and SRE basics\nCapstone: resilient cloud platform"
            ),
            new CourseSeed(
                "Cybersecurity & Ethical Hacking",
                "Develop practical defensive security skills across networks, web applications, identity, cloud, threat detection, incident response, and ethical penetration testing.",
                "18 weeks", "Intermediate", "security", "Cybersecurity", new BigDecimal("8299"),
                "Basic networking knowledge\nA laptop capable of running virtual machines",
                "Network and web security\nLinux security tooling\nVulnerability assessment\nEthical penetration testing\nSIEM and threat detection\nIncident response labs",
                "Neha Kulkarni", 4.7, 1655,
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
                "Security and networking foundations\nLinux security tools\nWeb application security\nIdentity and access management\nCloud security basics\nThreat detection and SIEM\nIncident response\nCapstone: security assessment"
            ),
            new CourseSeed(
                "UI/UX & Digital Product Design",
                "Research, design, prototype, and test inclusive digital products using Figma, design systems, accessibility standards, and product thinking.",
                "12 weeks", "Beginner", "design_services", "Design", new BigDecimal("6499"),
                "No design experience required\nAccess to a modern web browser",
                "User research and journey mapping\nInformation architecture\nWireframes and interactive prototypes\nVisual design in Figma\nAccessible design systems\nPortfolio case study",
                "Riya Kapoor", 4.8, 1280,
                "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
                "Product discovery and research\nPersonas and user journeys\nInformation architecture\nWireframing\nFigma prototyping\nDesign systems and accessibility\nUsability testing\nCapstone: polished product case study"
            )
        );

        Course existingJava = courseRepository.findAll().stream()
                .filter(course -> course.getName() != null && course.getName().toLowerCase().contains("java"))
                .findFirst().orElse(null);

        for (CourseSeed seed : catalog) {
            Course course;
            if (seed.name().startsWith("Modern Java") && existingJava != null) {
                course = existingJava;
            } else {
                course = courseRepository.findAll().stream()
                        .filter(item -> seed.name().equalsIgnoreCase(item.getName()))
                        .findFirst().orElseGet(Course::new);
            }
            applySeed(course, seed);
            courseRepository.save(course);
        }

        System.out.println("Initialized current course catalog with " + catalog.size() + " featured courses");
    }

    private void applySeed(Course course, CourseSeed seed) {
        course.setName(seed.name());
        course.setDescription(seed.description());
        course.setDuration(seed.duration());
        course.setLevel(seed.level());
        course.setIcon(seed.icon());
        course.setCategory(seed.category());
        course.setPrice(seed.price());
        course.setPrerequisites(seed.prerequisites());
        course.setFeatures(seed.features());
        course.setInstructor(seed.instructor());
        course.setRating(seed.rating());
        course.setStudentsEnrolled(seed.studentsEnrolled());
        course.setThumbnailUrl(seed.thumbnailUrl());
        List<String> videoIds = featuredVideoIds(seed.name());
        String videoId = videoIds.get(0);
        course.setVideoType("YOUTUBE");
        course.setVideoUrl("https://www.youtube.com/watch?v=" + videoId);
        course.setVideoId(videoId);
        course.setMaterials(seed.materials());
        course.setModules(modulesFromMaterials(seed.materials(), videoIds));
    }

    private String modulesFromMaterials(String materials, List<String> videoIds) {
        String[] topics = materials == null ? new String[0] : materials.split("\\R");
        StringBuilder modules = new StringBuilder();
        for (int index = 0; index < topics.length && index < 3; index++) {
            String topic = topics[index].trim();
            if (!topic.isBlank()) {
                if (modules.length() > 0) modules.append('\n');
                modules.append("Module ").append(index + 1).append(": ").append(topic)
                        .append(" | https://www.youtube.com/watch?v=")
                        .append(videoIds.get(index % videoIds.size()));
            }
        }
        return modules.toString();
    }

    private List<String> featuredVideoIds(String courseName) {
        if (courseName.startsWith("Modern Java")) return List.of("xk4_1vDrzzo", "vtPkZShrvXQ", "9SGDpanrc8U");
        if (courseName.startsWith("AI Engineering")) return List.of("i_LwzRVP7bg", "aircAruvnKk", "GwIo3gDZCVQ");
        if (courseName.startsWith("Generative AI")) return List.of("H4YK_7MAckk", "dOxUroR57xs", "hHjmr_YOqnU");
        if (courseName.startsWith("Full-Stack")) return List.of("bMknfKXIFA8", "Oe421EPjeBE", "Ke90Tje7VS0");
        if (courseName.startsWith("Data Science")) return List.of("ua-CiDNNj30", "LHBE6Q9XlzI", "rfscVS0vtbw");
        if (courseName.startsWith("Cloud")) return List.of("Wf2eSG3owoA", "3c-iBn73dDE", "X48VuDVv0do");
        if (courseName.startsWith("Cybersecurity")) return List.of("3Kq1MIfTWCE", "inWWhr5tnEA", "U_P23SqJaDc");
        return List.of("kbZejnPXyLM", "c9Wg6Cb_YlU", "FTFaQWZBqQ8");
    }

    private record CourseSeed(String name, String description, String duration, String level, String icon,
                              String category, BigDecimal price, String prerequisites, String features,
                              String instructor, Double rating, Integer studentsEnrolled,
                              String thumbnailUrl, String materials) {}

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
        Message message1 = new Message("Aarav Sharma", "aarav.sharma@gmail.com", 
        "Hello! I'm interested in enrolling in the Advanced JavaScript course. Could you please provide more information about the prerequisites and schedule?");

Message message2 = new Message("Priya Patel", "priya.patel@gmail.com", 
        "I'm having trouble accessing the course materials. Could someone help me with the login process?");

Message message3 = new Message("Rohan Mehta", "rohan.mehta@gmail.com", 
        "Thank you for the excellent Spring Boot course! The content was very comprehensive and well-structured. I would love to see more advanced topics covered.");

Message message4 = new Message("Latika Jha", "latika.jha@gmail.com", 
        "Is there a mobile app available for accessing course content? It would be great to study on the go.");

Message message5 = new Message("Rahul Sharma", "rahul.sharma@gmail.com", 
        "I'm interested in the upcoming React course. When will registration open and what are the fees?");


        messageRepository.save(message1);
        messageRepository.save(message2);
        messageRepository.save(message3);
        messageRepository.save(message4);
        messageRepository.save(message5);

        System.out.println("✅ Initialized " + messageRepository.count() + " sample messages");
    }
}
