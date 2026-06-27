// --- DUAL BOOT GATEWAY ---
function bootToWindows() {
    document.getElementById('splash-screen').classList.add('hidden');
}

function bootToCyberpunk() {
    document.body.style.cursor = 'wait';
    document.querySelector('.please-wait').textContent = 'Redirecting to Matrix...';
    setTimeout(() => {
        window.location.href = '2/cyber/index.html';
    }, 500);
}

// --- KONTROL START MENU ---
function toggleStartMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('startMenu');
    const btn = document.getElementById('startBtn');
    menu.classList.toggle('active');
    btn.classList.toggle('active');
}

function closeStartMenu() {
    document.getElementById('startMenu').classList.remove('active');
    document.getElementById('startBtn').classList.remove('active');
}

// --- KONTROL MUAT GAMBAR DUA ARAH (ATAS & BAWAH SEKALIGUS) ---
function openFolder(folderName) {
    closeStartMenu();
    const win = document.getElementById('galleryWindow');
    const title = document.getElementById('windowTitle');
    const grid = document.getElementById('photoGridContent');
    
    title.textContent = `${folderName.toUpperCase()}.EXE`;
    grid.innerHTML = ''; 
    win.style.display = 'flex';

    // Tentukan perkiraan jumlah maksimal foto di folder kamu
    const MAX_PHOTOS = 30; 
    const midPoint = Math.floor(MAX_PHOTOS / 2);

    // Fungsi internal untuk memicu unduhan gambar ke grid
    function triggerLoad(index) {
        const imgUrl = `${folderName}/${index}.jpg`; 
        const img = new Image();
        
        img.onload = function() {
            // Cek apakah gambar ini sudah pernah dimasukkan (mencegah duplikat di titik tengah)
            if (grid.querySelector(`[data-index="${index}"]`)) return;

            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.setAttribute('data-index', index); 
            photoItem.innerHTML = `<img src="${imgUrl}" alt="Foto ${index}">`;
            
            photoItem.onclick = function() { 
                openLightbox(imgUrl); 
            };
            
            grid.appendChild(photoItem);
            sortGridItems(grid); // Tetap rapi diurutkan 1, 2, 3 meskipun datangnya acak
        };
        
        img.src = imgUrl;
    }

    // Eksekusi dua arah secara BERSAMAAN (Paralel)
    // 1. Jalur Atas (Maju dari 1 ke tengah)
    for (let i = 1; i <= midPoint; i++) {
        triggerLoad(i);
    }
    
    // 2. Jalurn Bawah (Mundur dari MAX ke tengah)
    for (let j = MAX_PHOTOS; j > midPoint; j--) {
        triggerLoad(j);
    }
}

// Fungsi pembantu untuk merapikan urutan kotak di web
function sortGridItems(grid) {
    const items = Array.from(grid.children);
    items.sort((a, b) => {
        return parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index'));
    });
    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(item));
}

function closeFolder() {
    document.getElementById('galleryWindow').style.display = 'none';
}

// --- KONTROL LIGHTBOX GAMBAR ---
function openLightbox(url) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = url;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Jam Digital Taskbar
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('liveClock').textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();
