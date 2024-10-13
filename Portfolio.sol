// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Portfolio{
 
  struct Project{
      uint id;
      string name;
      string description;
      string image;
      string githubLink;
  }

  struct Education{
      uint id;
      string date;
      string degree;
      string knowledgeAcquired;
      string instutionName;
  }

  struct Experience{
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
  }

  Project[10] public projects;
  Education[10] public educationDetails;
  Experience[10] public experienceDetails;
  Hero public hero;

  uint projectCount;
  uint educationCount;
  uint experienceCount;
  address public manager;

  constructor(){
      manager = msg.sender;
      // Initialize hero with default values
      hero = Hero(0, "QmQ1o1jw4wGtttRcrXbz1xk1QdzLQGZyzULQ79Y6UaojEf", "A motivated software engineer...", "QmT9hstvnvYhYJHWMJkr5p1vdVeApc3o88pYpgTbHjwjZM");
  }

  modifier onlyManager(){
      require(manager == msg.sender, "You are not the manager");
      _;
  }

  // Project functions
  function insertProject(string calldata _name, string calldata _description, string calldata _image, string calldata _githubLink) external {
      require(projectCount < 10, "Only 10 projects allowed");
      projects[projectCount] = Project(projectCount, _name, _description, _image, _githubLink);
      projectCount++;
  }

  function changeProject(string calldata _name, string calldata _description, string calldata _image, string calldata _githubLink, uint _projectCount) external {
      require(_projectCount >= 0 && _projectCount < 10, "Only 10 projects allowed");
      projects[_projectCount] = Project(_projectCount, _name, _description, _image, _githubLink);
  }

  function allProjects() external view returns(Project[10] memory){
      return projects;
  }

  // Education functions
  function insertEducation(string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _instutionName) external onlyManager {
      require(educationCount < 10, "Only 10 education details allowed");
      educationDetails[educationCount] = Education(educationCount, _date, _degree, _knowledgeAcquired, _instutionName);
      educationCount++;
  }

  function changeEducation(string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _instutionName, uint _educationDetailCount) external onlyManager {
      require(_educationDetailCount >= 0 && _educationDetailCount < 10, "Invalid educationCount");
      educationDetails[_educationDetailCount] = Education(_educationDetailCount, _date, _degree, _knowledgeAcquired, _instutionName);
  }

  function allEductationDetails() external view returns(Education[10] memory){
      return educationDetails;
  }

  // Experience functions
  function insertExperience(string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName) external onlyManager {
      require(experienceCount < 10, "Only 10 experience details allowed");
      experienceDetails[experienceCount] = Experience(experienceCount, _date, _post, _knowledgeAcquired, _companyName);
      experienceCount++;
  }

  function changeExperience(string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName, uint _experienceDetailCount) external onlyManager {
      require(_experienceDetailCount >= 0 && _experienceDetailCount < 10, "Invalid experienceCount");
      experienceDetails[_experienceDetailCount] = Experience(_experienceDetailCount, _date, _post, _knowledgeAcquired, _companyName);
  }

  function allExperienceDetails() external view returns(Experience[10] memory){
      return experienceDetails;
  }

  // Hero functions
  function insertHero(string calldata _imageLink, string calldata _description, string calldata _resumeLink) external onlyManager {
      hero = Hero(0, _imageLink, _description, _resumeLink);
  }

  function changeHero(string calldata _imageLink, string calldata _description, string calldata _resumeLink) external onlyManager {
      hero = Hero(0, _imageLink, _description, _resumeLink);
  }

  function getHero() external view returns(Hero memory) {
      return hero;
  }

 

  // Payment functionality
  function donate() public payable {
      payable(manager).transfer(msg.value);
  }
}
