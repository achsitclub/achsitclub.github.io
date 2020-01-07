'use strict';

const searchButton = document.querySelector('#searchButton')
const resultContainer = document.querySelector('#repo-description')
const starContainer = document.getElementById("repo-star")

class GitHub {
    constructor(url) {
        this.url = url;
    }

    async fetchUsers() {
        try {
            const data = await axios.get(this.url);
            return data;
        }   catch(err) {
            console.log(err);
        }
    }

    async showData() {
        const result = await this.fetchUsers(this.url);
        result.data.forEach(repo => {
            const anchor = document.createElement('a');
            anchor.href = repo.html_url;
            anchor.textContent = repo.name;
            resultContainer.appendChild(anchor);
            resultContainer.appendChild(document.createElement("br"));

            resultContainer.appendChild(document.createTextNode(`${repo.description}`));
            resultContainer.appendChild(document.createElement("br"));

            resultContainer.appendChild(document.createTextNode(`Language : ${repo.language} `));
            resultContainer.appendChild(document.createTextNode(`Issues : ${repo.open_issues_count} `));
            resultContainer.appendChild(document.createTextNode(`Star : ${repo.stargazers_count} `));
            resultContainer.appendChild(document.createTextNode(`Forks : ${repo.forks_count} `));
            resultContainer.appendChild(document.createTextNode(`Updated at : ${new moment(repo.updated_at).format('MMMM Do YYYY')}`));

            resultContainer.appendChild(document.createElement("br"));
            resultContainer.appendChild(document.createElement("hr"));
        });
    }
}

const URL = `https://api.github.com/users/achsitclub/repos`

const achsitclub = new GitHub(URL)
achsitclub.showData()





