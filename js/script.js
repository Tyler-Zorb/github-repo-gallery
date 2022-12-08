//this is selecting the div with a class of "overview" This is where my profile info will appear.
const overview = document.querySelector(".overview");
const username = "Tyler-Zorb";       //this adds my GitHub username.
const repoList = document.querySelector(".repo-list");      //This variable will select the unordered list to display the repos list.
const allReposContainer = document.querySelector(".repos");   //This variable selects the section with a class of "repos" where all my repo info appears.
const repoData = document.querySelector(".repo-data");    //This variable selects the section with a calss of "repo-data" where the individual repo data will appear.

const gitUserInfo = async function () {         //this is an async function to fetch info from my GitHub profile using the GitHub API address. I had to target the "users" endpoint and use a template literal to add the global username variable to the endpoint.
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();  //calling the function to see results.

const displayUserInfo = function (data) {           //creating a function to display the fetched user information on the page. This accepts the JSON data as a parameter.
    const div = document.createElement("div");      //inside this function this is a new div created and it'll have the class of "user-info"
    div.classList.add("user.info");

    //This innerHTML populates the div with the elements for figure, image, paragraphs
    //I have to use the JSON data in the 5 placeholders to grab the relevant properties to display on the page.
    div.innerHTML = `<figure>               
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);     //Here I am appending the div to the overview element.
  gitRepos();           //Here I am calling the async function that fetches my repos. I did this at the end of this lesson after the function is created obviously.
};

const gitRepos = async function () {        //This async function will fetch my repos.
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); //I was supposed to find this API myself using a link to a list they gave me but I can't figure out these API's so I copied this from the solution. It is sorted by most recently updated to last and shows up to 100 per page.
    const repoData = await fetchRepos.json();       //The 2nd await returns the JSON response which you use the variable from the first awat.
    displayRepos(repoData);         //Here I am calling the function I just created below this. I passed the json response data for the repos as an argument. 
};

const displayRepos = function (repos) {     //This function displays info about each repo. Repos is the parameter so that the function accepts the data returned from my last API call.
    for (const repo of repos) {
       const repoItem = document.createElement("li");   //This I need because I need to list out the repos.
       repoItem.classList.add("repo");          //This add the class of repo.
       repoItem.innerHTML = `<h3>${repo.name}</h3> `;       //This gives each item an <h3> element with the repo name
       repoList.append(repoItem);       //Here I am appending the list item to the global variable that selects the unordered repos list. So appending the repoItem to the global var of repoList.
    }
};

repoList.addEventListener("click", function (e) {   //Here's an event listener for a click event on the unordered list with a class of "repo-list". Passing the event (e) in the callback function.
  if (e.target.matches("h3")) {           //This conditional statement checks if the event target(i.e. the element that was clicked on) matches the <h3> element (i.e. the name of the repo)(they gave me this line becuase i haven't used matches before)
    const repoName = e.target.innerText;      //This variable targets the innerText where the event happens.
    getRepoInfo(repoName);      //calling the getRepoInfo function with repoName as an argument.
  }         
});

const getRepoInfo = async function (repoName) {     //async function that accepts repoName as a parameter. This function gets specfic repo information.
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);      //fetch request to grab info about the specific repository.
  const repoInfo = await fetchInfo.json();      //declared a var to resolve and save the json response.
  console.log(repoInfo);    //logging out repoInfo.
  
  const fetchLanguages = await fetch(repoInfo.languages_url);     //This variable will fetch data from language_url property of my repoInfo.
  const languageData = await fetchLanguages.json();   //This variable will save the json response.
  //console.log(languageData);    commenting this out, it was just to see if the console would display the languages used when click on a repo and it does.
  
  const languages = [];   //This is an empty array for the languages.
  for (const language in languageData) {       //this for in loop will loop thru the languages array from the languageData object.
    languages.push(language);
  }
  //console.log(languages);   commenting this out. It was just to see if this would show the array with the languages used in the console and it does.
  displayRepoInfo(repoInfo, languages);   //calling the displayRepoInfo function I made below this. And passing it the repoInfo object and languages array 
};

const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";    //This will empty the HTML of the section with a class of "repo-data" where the individual repo data will appear.
  repoData.classList.remove("hide");  //Here I'm unhiding or show the repo-data element.
  allReposContainer.classList.add("hide");  //Here I'm hiding the element with the class of "repos"
  const div = document.createElement("div");  //creating a new div here like above. But here I'm adding the selected repository's name, description, default branch, and link to its code on github.
  //Here where I'm creating the div I have to use the json data in the 5 palceholders to grab the relevant properties to display on the page. I'm using the properties from the object I retrieved when I fetched the specific repos.
  div.innerHTML = `           
  <h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);     //appending the new div element to the section with a class of "repo-data"
};