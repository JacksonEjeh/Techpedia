const deadline = new Date('September 21, 2024 23:59:59').getTime();
const currentDate = new Date().getTime();
const fineAmount = 5000;
let fineApplied = false;

const registerForm = document.getElementById('registerForm');
const fineMessage = document.getElementById('fineMessage');

if (currentDate > deadline) {
    fineApplied = true;
    fineMessage.style.display = 'block';
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const schoolName = document.getElementById('schoolName').value;
    const stdClass = document.getElementById('stdClass').value;
    const stdState = document.getElementById('stdState').value;
    const contactName = document.getElementById('contactName').value;
    const contactNumb = document.getElementById('contactNumb').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const principal = document.getElementById('principal').value;
    const schOwner = document.getElementById('schOwner').value;
    const headTeach = document.getElementById('headTeach').value;
    const teacher = document.getElementById('teacher').value;

    
    
    let valid = true

    if (schoolName === "") {
        valid = false
        document.getElementById('schoolName').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err1').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err1').innerHTML=''
            document.getElementById('schoolName').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (stdClass === "") {
        valid = false
        document.getElementById('stdClass').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err2').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err2').innerHTML=''
            document.getElementById('stdClass').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (stdState === "") {
        valid = false
        document.getElementById('stdState').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err3').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err3').innerHTML=''
            document.getElementById('stdState').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (contactName === "") {
        valid = false
        document.getElementById('contactName').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err4').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err4').innerHTML=''
            document.getElementById('contactName').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (contactNumb === "") {
        valid = false
        document.getElementById('contactNumb').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err5').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err5').innerHTML=''
            document.getElementById('contactNumb').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    } 
    else if (contactEmail === "") {
        valid = false
        document.getElementById('contactEmail').classList.add('shadow-red-200', 'shadow-md');
        document.getElementById('err6').innerHTML='This is a required question'
        setTimeout(()=>{
            document.getElementById('err6').innerHTML=''
            document.getElementById('contactEmail').classList.remove('shadow-red-200', 'shadow-md');
        }, 2000)
    }else{
        valid = true
        let registrations = JSON.parse(localStorage.getItem('registrations'));
        registrations.push({ schoolName, fineApplied });
        localStorage.setItem('registrations', JSON.stringify(registrations));
        alert("Registration successful!");
        window.location.reload()
        window.location.href="candidteReg.html"
    }
})