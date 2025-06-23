let allExtensions=[];

document.addEventListener("DOMContentLoaded",()=>{
    const list = document.getElementById("extensions-list");
    const filters =  document.querySelectorAll(".list-f .filter");
    const themeToggle = document.getElementById("theme-toggle");

    fetch("data.json")
    .then(res=> res.json())
    .then(data=>{
        allExtensions=data;
        renderExtensions("all");
    });

    function renderExtensions(filters){
        list.innerHTML="";
        const filtered= allExtensions.filter(ext=>{
            if(filters === "active") return ext.isActive;
            if(filters === "inactive") return !ext.isActive;
            return true ;
        });
        filtered.forEach(ext=> {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML= `
            <img src="${ext.logo}" alt="${ext.name}">
            <div class="title">${ext.name}</div>
            <p>${ext.description}</p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
            <button onclick="removeExtension('${ext.name}')">Remove</button>
            <label class="switch">
            <input type="checkbox" onchange="toggleExtension('${ext.name}')" ${ext.isActive? "checked" : ""} >
            <span class="slider"> </span>
            </label>
            </div>
            
            `;
            list.appendChild(card);
        });
    
    }
    window.toggleExtension = function(name) {
        allExtensions = allExtensions.map(ext=>
           ext.name=== name?{...ext, isActive:!isActive} : ext);
           const current= document.querySelector(".filter.active").dataset.filter;
           renderExtensions(current);
           
    };
    window.removeExtension = function(name) {
        allExtensions=allExtensions.filter(ext=>ext.name !==name);
        const current = document.querySelector(".filter.active").dataset.filter;
        renderExtensions(current);
    }
    filters.forEach(btn=>{
        btn.addEventListener("click" , ()=> {
            document.querySelector(".filter.active").classList.remove("active");
            btn.classList.add("active");
            renderExtensions(btn.dataset.filter);
        });
    });
    themeToggle.addEventListener("click", ()=>{
        document.body.classList.toggle("light");
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark")? "☀️" : "🌙";
    })
});