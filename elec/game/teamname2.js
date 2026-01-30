function displayName(teamname){
    document.querySelector('.container').innerHTML = "Team: " + DOMPurify.sanitize(teamname);
}
const form = document.querySelector('form')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    document.querySelector('.container').innerHTML = '';
    const val = document.querySelector('input').value;
    const link = document.createElement('a');
    link.innerText = 'Team site'
    link.href=val;
     document.querySelector('.container').appendChild(link)
    
})
window.addEventListener("message",(e)=>{
    const name = e.data.name;
    displayName(name)
})
