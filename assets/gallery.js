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

// --- KONTROL PEMANGGILAN MANUAL SUPER CEPAT (1 SAMPAI 100) ---
function openFolder(folderName) {
    closeStartMenu();
    const win = document.getElementById('galleryWindow');
    const title = document.getElementById('windowTitle');
    const grid = document.getElementById('photoGridContent');
    
    title.textContent = `${folderName.toUpperCase()}.EXE`;
    grid.innerHTML = ''; // Bersihkan isi grid lama
    win.style.display = 'flex';

    // DAFTAR URUTAN LIST PEMANGGIL MANUAl (1 SAMPAI 100)
    const manualList = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100
    ];

    // Proses pemanggilan daftar manual di atas secara bersamaan
    manualList.forEach(num => {
        // Otomatis membentuk format jalur: folderName/1.jpg, folderName/2.jpg, dst.
        const imgUrl = `${folderName}/${num}.jpg`; 
        const img = new Image();
        img.loading = "lazy"; // Menjaga performa RAM browser agar tidak crash
        
        img.onload = function() {
            // JIKA FOTO DITEMUKAN: Buat kotaknya dan tampilkan ke layar
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.setAttribute('data-index', num); 
            photoItem.innerHTML = `<img src="${imgUrl}" alt="Foto ${num}" loading="lazy">`;
            
            photoItem.onclick = function() { 
                openLightbox(imgUrl); 
            };
            
            grid.appendChild(photoItem);
            sortGridItems(grid); // Urutkan posisi kotak agar tetap rapi dari angka 1-100
        };
        
        img.onerror = function() {
            // JIKA FOTO TIDAK ADA: Otomatis diabaikan tanpa merusak susunan grid web
        };
        
        img.src = imgUrl; // Tembak pemanggilan file langsung ke server GitHub
    });
}

// Fungsi pembantu untuk mengurutkan posisi kotak berdasarkan atribut data-index
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
