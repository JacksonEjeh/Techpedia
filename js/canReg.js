let registeredSchools = JSON.parse(localStorage.getItem('registrations'));
registeredSchools.forEach(function(res){
    document.getElementById('institution').innerHTML += `<option value="${res.schoolName}">${res.schoolName}</option>`
})

const candidateRegisterForm = document.getElementById("candidateRegisterForm");


candidateRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const canName = document.getElementById('canName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const experience = document.getElementById('experience').value;
    const institution = document.getElementById('institution').value;

    
    
    let valid = true

    if (canName === "") {
        valid = false
        document.getElementById('canName').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err1').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err1').innerHTML=''
            document.getElementById('canName').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (email === "") {
        valid = false
        document.getElementById('email').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err2').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err2').innerHTML=''
            document.getElementById('email').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (phone === "") {
        valid = false
        document.getElementById('phone').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err3').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err3').innerHTML=''
            document.getElementById('phone').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (age === "") {
        valid = false
        document.getElementById('age').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err4').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err4').innerHTML=''
            document.getElementById('age').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (experience === "") {
        valid = false
        document.getElementById('experience').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err5').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err5').innerHTML=''
            document.getElementById('experience').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (institution === "") {
        valid = false
        document.getElementById('institution').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err6').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err6').innerHTML=''
            document.getElementById('institution').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    }else{
        valid = true
        let candidateRegistrations = JSON.parse(localStorage.getItem('candidateRegistrations')) || [];
        candidateRegistrations.push({canName, institution});
        localStorage.setItem('candidateRegistrations', JSON.stringify(candidateRegistrations));
        alert("Candidate Registration successful!");
        window.location.reload()
        window.location.href="quizsection.html"
    }
})
