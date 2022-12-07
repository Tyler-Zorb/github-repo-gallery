//this is selecting the div with a class of "overview" This is where my profile info will appear.
const overview = document.querySelector(".overview");
const username = "Tyler-Zorb";       //this adds my GitHub username.
const repoList = document.querySelector(".repo-list");      //This variable will select the unordered list to display the repos list.

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