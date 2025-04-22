document.querySelectorAll('.link-cart').forEach((element) =>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        const url = e.target.getAttribute('href');
        console.log(url);
        fetch(url, {
            method:"POST",
        }).then((res)=>{
            console.log(res)
        })
    })
})
