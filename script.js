
const listContainer = document.getElementById('extension-list');

let allExtensions = [];

//Load data
async function loadExtensions() {
     try {
        const response = await fetch('data.json');

        const data = await response.json();

        allExtensions = data;
        console.log("Du lieu nhan:", data);

        renderExtensions(data);
        
     } catch (error) {
        console.error("Loi khi tai du lieu:", error);
        if (listContainer){
            listContainer.innerHTML = `<p style="color: red; text-align: center;">Loi ket noi! Khong tai duoc du lieu.</p>`;
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

        const statusClass = item.isActive? 'active' : 'inactive';
        const statusText = item.isActive? 'active' : 'inactive';

        return`
        <article class="extension-card">
            <div class="card-header">
                <img
                    src="${item.logo}"
                    alt="${item.name}"
                    class="card-logo"
                    onerror="this.src='https://placehold.co/40x40?text=Icon'"
                >

                <h3 class="card-title">${item.name}</h3>
            </div>

            <p class="card-desc">${item.description}</p>

            <div class="card-footer">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <button class="btn-remove" onclick="removeExtension('${item.name}')">
                    Remove
                </button>                
            </div>
        </article>
        `;
    }).join('');

    listContainer.innerHTML = htmlContent;
}

function removeExtension(namToDelete){
    const isConfirmed = confirm(`Ban chac muon xoa "${namToDelete}" khong?`);
    if(isConfirmed){
        allExtensions = allExtensions.filter(item => item.name !== namToDelete);

        renderExtensions(allExtensions);
    }
}

loadExtensions();

// DARK MODE
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

if(toggleButton){
    toggleButton.addEventListener('click',() =>{
        body.classList.toggle('dark-mode');

        if(body.classList.contains('dark-mode')){
            toggleButton.textContent = "Light mode";
        }else{
            toggleButton.textContent = "Dark mode";
        }
    });
}