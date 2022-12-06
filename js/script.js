//this is selecting the div with a class of "overview" This is where my profile info will appear.
const overview = document.querySelector(".overview");
const username = "Tyler-Zorb";       //this adds my GitHub username.

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
};