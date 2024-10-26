// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Portfolio {

    struct Project {
        uint id;
        string name;
        string description;
        string image;
        string githubLink;
    }

    struct Education {
        uint id;
        string date;
        string degree;
        string knowledgeAcquired;
        string institutionName;
    }

    struct Experience {
        uint id;
        string date;
        string post;
        string knowledgeAcquired;
        string companyName;
    }

    struct Hero {
        uint id;
        string imageLink;
        string description;
        string resumeLink;
        string email; // Add an email field
    }

    struct SocialMedia {
        string platform;
        string link;
    }

    struct Skill {
        string name;
        string proficiency; // Example: Beginner, Intermediate, Expert
    }

    Project[] public projects;
    Education[] public educationDetails;
    Experience[] public experienceDetails;
    Hero public hero;
    SocialMedia[] public socialMediaLinks;
    Skill[] public skills;

    address public manager;

    constructor() {
        manager = msg.sender;
        // Initialize hero with default values, including email
        hero = Hero(0, "QmQ1o1jw4wGtttRcrXbz1xk1QdzLQGZyzULQ79Y6UaojEf", "A motivated software engineer.....", "QmT9hstvnvYhYJHWMJkr5p1vdVeApc3o88pYpgTbHjwjZM", "sachinthanabuddhika79@gmail.com");
    }

    modifier onlyManager() {
        require(manager == msg.sender, "You are not the manager");
        _;
    }

    // Project functions
    function insertProject(string calldata _name, string calldata _description, string calldata _image, string calldata _githubLink) external {
        projects.push(Project(projects.length, _name, _description, _image, _githubLink));
    }

    function changeProject(string calldata _name, string calldata _description, string calldata _image, string calldata _githubLink, uint _projectId) external {
        require(_projectId < projects.length, "Invalid project ID");
        projects[_projectId] = Project(_projectId, _name, _description, _image, _githubLink);
    }

    function allProjects() external view returns(Project[] memory) {
        return projects;
    }

    // Education functions
    function insertEducation(string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName) external onlyManager {
        educationDetails.push(Education(educationDetails.length, _date, _degree, _knowledgeAcquired, _institutionName));
    }

    function changeEducation(string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName, uint _educationId) external onlyManager {
        require(_educationId < educationDetails.length, "Invalid education ID");
        educationDetails[_educationId] = Education(_educationId, _date, _degree, _knowledgeAcquired, _institutionName);
    }

    function allEducationDetails() external view returns(Education[] memory) {
        return educationDetails;
    }

    // Experience functions
    function insertExperience(string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName) external onlyManager {
        experienceDetails.push(Experience(experienceDetails.length, _date, _post, _knowledgeAcquired, _companyName));
    }

    function changeExperience(string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName, uint _experienceId) external onlyManager {
        require(_experienceId < experienceDetails.length, "Invalid experience ID");
        experienceDetails[_experienceId] = Experience(_experienceId, _date, _post, _knowledgeAcquired, _companyName);
    }

    function allExperienceDetails() external view returns(Experience[] memory) {
        return experienceDetails;
    }

    // Hero functions
    function insertHero(string calldata _imageLink, string calldata _description, string calldata _resumeLink, string calldata _email) external onlyManager {
        hero = Hero(0, _imageLink, _description, _resumeLink, _email);
    }

    function changeHero(string calldata _imageLink, string calldata _description, string calldata _resumeLink, string calldata _email) external onlyManager {
        hero = Hero(0, _imageLink, _description, _resumeLink, _email);
    }

    function getHero() external view returns (Hero memory) {
        return hero;
    }

    function getEmail() external view returns (string memory) {
        return hero.email;
    }

    // Social Media functions
    function addSocialMedia(string calldata _platform, string calldata _link) external onlyManager {
        socialMediaLinks.push(SocialMedia(_platform, _link));
    }

    function getSocialMedia() external view returns(SocialMedia[] memory) {
        return socialMediaLinks;
    }

    // Skill functions
    function addSkill(string calldata _name, string calldata _proficiency) external onlyManager {
        skills.push(Skill(_name, _proficiency));
    }

    function getSkills() external view returns(Skill[] memory) {
        return skills;
    }

    // Payment functionality
    function donate() public payable {
        payable(manager).transfer(msg.value);
    }
}
