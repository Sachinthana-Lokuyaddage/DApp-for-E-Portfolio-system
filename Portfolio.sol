// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface ICredentialVerification {
    function isVerified(address _user) external view returns (bool);
}

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
    ICredentialVerification public verifier;

    event ProjectAdded(uint indexed id, string name, string image);

    constructor(address _credentialVerification) {
        manager = msg.sender;
        verifier = ICredentialVerification(_credentialVerification);
        // Initialize hero with default values, including email
        hero = Hero(0, "QmQ1o1jw4wGtttRcrXbz1xk1QdzLQGZyzULQ79Y6UaojEf", "A motivated software engineer.....", "QmT9hstvnvYhYJHWMJkr5p1vdVeApc3o88pYpgTbHjwjZM", "sachinthanabuddhika79@gmail.com");
    }

    modifier onlyManager() {
        require(manager == msg.sender, "You are not the manager");
        _;
    }

    modifier onlyVerified(address _user) {
        require(verifier.isVerified(_user), "User not verified");
        _;
    }

    // Project functions - require verification of the caller's address
    function insertProject(string calldata _name, string calldata _description, string calldata _image, string calldata _githubLink) external onlyVerified(msg.sender) {
        projects.push(Project(projects.length, _name, _description, _image, _githubLink));
        emit ProjectAdded(projects.length - 1, _name, _image);
    }

    function allProjects() external view returns(Project[] memory) {
        return projects;
    }

    // Education functions - manager only (could be verified separately if desired)
    function insertEducation(string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName) external onlyManager {
        educationDetails.push(Education(educationDetails.length, _date, _degree, _knowledgeAcquired, _institutionName));
    }

    function allEducationDetails() external view returns(Education[] memory) {
        return educationDetails;
    }

    // Experience functions - manager only
    function insertExperience(string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName) external onlyManager {
        experienceDetails.push(Experience(experienceDetails.length, _date, _post, _knowledgeAcquired, _companyName));
    }

    function allExperienceDetails() external view returns(Experience[] memory) {
        return experienceDetails;
    }

    // Hero functions - require verification to update
    function insertHero(string calldata _imageLink, string calldata _description, string calldata _resumeLink, string calldata _email) external onlyVerified(msg.sender) {
        hero = Hero(0, _imageLink, _description, _resumeLink, _email);
    }

    function getHero() external view returns (Hero memory) {
        return hero;
    }

    function getEmail() external view returns (string memory) {
        return hero.email;
    }

    // Social Media functions - require verification
    function addSocialMedia(string calldata _platform, string calldata _link) external onlyVerified(msg.sender) {
        socialMediaLinks.push(SocialMedia(_platform, _link));
    }

    function getSocialMedia() external view returns(SocialMedia[] memory) {
        return socialMediaLinks;
    }

    // Skill functions - require verification
    function addSkill(string calldata _name, string calldata _proficiency) external onlyVerified(msg.sender) {
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
