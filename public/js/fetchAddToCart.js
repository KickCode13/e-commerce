document.querySelectorAll('.link-cart').forEach((element) =>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        const quantity = document.getElementById("quantity").value
        const url = e.target.getAttribute('href');
        console.log(url);
        fetch(url, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        }).then((res)=>{
            console.log(res)
        })
    })
})
