function displayName(){
    const teamname = document.querySelector('input').value;
    document.querySelector('.container').innerHTML = "Team: " + DOMPurify.sanitize(teamname);
}

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    displayName()
})