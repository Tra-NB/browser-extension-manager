

const listContainer = document.getElementById('extension-list');
let allExtensions = [];

// Load data
async function loadExtensions() {
    try {
        const response = await fetch('data.json');

        const data = await response.json();

        allExtensions = data;

        renderExtensions(data);
    } catch (error) {
        console.error("Loi du lieu:", error);

        if(listContainer){
            listContainer.innerHTML = `<p style= "color : red; text-align: center;">Loi ket noi! Khong tai duoc du lieu.</p>`
        }
    }
}

//Render data
function renderExtensions(extension){
    if(!listContainer) return;

    if(extension.length == 0){
        listContainer.innerHTML = '<p style = "text-align: center; with: 100%;">Khong tim thay</p>';
        return;
    }

    const htmlContent = extension.map(item => {
        return`
        <article class="extension-card">
            <div class="card-header">
                <img
                    src="${item.logo}"
                    alt="${item.name}"
                    class="card-logo"
                    onerror="this.src='https://placehold.co/40x40?text=Icon'"
                >

                <div> 
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            </div>


            <div class="card-footer">
                <button class="btn-remove" onclick="removeExtension('${item.name}')">
                    Remove
                </button>                
               <div class="toggle-box ${item.isActive ? 'active' : ''}" onclick="handleToggle('${item.name}')">
                    <div class="dot"></div>
                </div>
            </div>
        </article>
        `;
    }).join('');

    listContainer.innerHTML = htmlContent;
}



function handleToggle(name){
    allExtensions = allExtensions.map(item => {
        if(item.name === name){
            return{...item, isActive: !item.isActive};
        }
        return item;
    });

    renderExtensions(allExtensions);    
}

function removeExtension(nameToDelete){
    const isConfirmed = confirm(`Ban chac muon xoa "${nameToDelete}" khong?`);
    if(isConfirmed){
        allExtensions = allExtensions.filter(item => item.name !== nameToDelete);

        renderExtensions(allExtensions);
    }
}

loadExtensions();

// DARK MODE
const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

if(toggleButton && themeIcon){
    toggleButton.addEventListener('click',() =>{
        body.classList.toggle('dark-mode');

        if(body.classList.contains('dark-mode')){
           themeIcon.src = "./assets/images/icon-sun.svg";
        }else{
          themeIcon.src = "./assets/images/icon-moon.svg";
        }
    });
}

// Lọc dữ liệu
function filterData(status) {
    
    const buttons = document.querySelectorAll('.filter-group button');
    buttons.forEach(btn => {
        btn.classList.remove('active'); 
        
        if (btn.innerText.toLowerCase() === status) {
            btn.classList.add('active');
        }
    });

    let filteredExtensions = [];

    if (status === 'all') {
        filteredExtensions = allExtensions;
    } else if (status === 'active') {
        filteredExtensions = allExtensions.filter(item => item.isActive === true);
    } else if (status === 'inactive') {
        filteredExtensions = allExtensions.filter(item => item.isActive === false);
    }

    renderExtensions(filteredExtensions);
}