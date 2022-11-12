// Login Error 
let toast = document.querySelector(".custom-toast");
let closebtn = document.querySelector(".close");
let progress = document.querySelector(".custom-progress");
let successIcon = document.querySelector(".successIcon")
function toastShow(){
    toast.classList.add('active')
    progress.classList.add('active')

    setTimeout(()=>{
    toast.classList.remove('active')
    },2000)
}

function toastSuccess(){
    toast.classList.add("active")
    toast.classList.add('success')
    setTimeout(()=>{
        toast.classList.remove('active')
        },5000)
}
closebtn.addEventListener("click",()=>{
    toast.classList.remove('active')

    setTimeout(()=>{
        toast.classList.remove('active')
        },300)
}) 


function signupToast(){
    toast.classList.add('active')
    progress.classList.add('active')

    setTimeout(()=>{
    toast.classList.remove('active')
    },2000)
}
function toastSuccess(){
    toast.classList.add("active")
    toast.classList.add('success')
    setTimeout(()=>{
        toast.classList.remove('active')
        },2000)
}
closebtn.addEventListener("click",()=>{
    toast.classList.remove('active')

    setTimeout(()=>{
        toast.classList.remove('active')
        },300)
}) 
    