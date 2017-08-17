function getIssues() {
  fetch(`https://api.github.com/repos/jamesrhee91/javascript-fetch-lab/issues`, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {

  const src = document.getElementById("issues-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(json)
  document.getElementById("issues").innerHTML = repoList

  // let issues = json.map(issue => `<li>${issue.title} - ${issue.body}</li>`).join("")
  // document.getElementById('issues').innerHTML = `<ul>${issues}</ul>`
}

function createIssue() {
  let t = document.getElementById('title').value
  let b = document.getElementById('body').value
  let myData = {title: t, body: b}

  fetch(`https://api.github.com/repos/jamesrhee91/javascript-fetch-lab/issues`, {
    method: 'POST',
    body: JSON.stringify(myData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => getIssues());

}

function showResults(json) {

  const src = document.getElementById('repo-template').innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(json)
  document.getElementById('results').innerHTML = repoList
  // document.getElementById('results').innerHTML = `<a href=${json.html_url}>${json.html_url}</a>`
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'

  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showResults(json));

}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  // return '104ecfc2669debd6debe05903c3619191a0ebee6'
  return ''
}

// const token = 'ad4416b728d3f360122053709387d61fd8c2580a';
//
// fetch('https://api.github.com/user/repos', {
//   headers: {
//     Authorization: `token ${token}`
//   }
// }).then(res => res.json()).then(json => console.log(json));
