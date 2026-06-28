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

// --- KONTROL SUPER ULTRA FAST UNTUK RIBUAN GAMBAR (Hingga 3000.jpg) ---
function openFolder(folderName) {
    closeStartMenu();
    const win = document.getElementById('galleryWindow');
    const title = document.getElementById('windowTitle');
    const grid = document.getElementById('photoGridContent');
    
    title.textContent = `${folderName.toUpperCase()}.EXE`;
    grid.innerHTML = ''; // Bersihkan grid setiap folder dibuka
    win.style.display = 'flex';

    // Batas maksimal list pemanggil sesuai permintaanmu (3000 foto)
    const MAX_PHOTOS = 3000; 

    // Tembak semua list pemanggil dari 1 sampai 3000 secara bersamaan (Paralel)
    for (let i = 1; i <= MAX_PHOTOS; i++) {
        const imgUrl = `${folderName}/${i}.jpg`; 
        const img = new Image();
        
        // Aktifkan fitur lazy load bawaan browser agar tidak membebani RAM
        img.loading = "lazy"; 
        
        img.onload = function() {
            // JIKA FOTO ADA: Buat kontainer kotaknya secara instan
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.setAttribute('data-index', i); 
            photoItem.innerHTML = `<img src="${imgUrl}" alt="Foto ${i}" loading="lazy">`;
            
            photoItem.onclick = function() { 
                openLightbox(imgUrl); 
            };
            
            grid.appendChild(photoItem);
            
            // Susun ulang posisi kotak agar tetap berurutan 1, 2, 3... meskipun proses download-nya acak
            sortGridItems(grid);
        };
        
        img.onerror = function() {
            // JIKA FOTO TIDAK ADA: Diamkan saja, otomatis dilewati dan tidak merusak web
        };
        
        // Mulai jalankan list pemanggil ke server GitHub
        img.src = imgUrl; 
    }
}

// Fungsi pembantu untuk merapikan urutan kotak berdasarkan angka data-index
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
