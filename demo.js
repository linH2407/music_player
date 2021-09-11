const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const singer = $('header h4');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Jar of hearts',
            singer: 'Christina Perri',
            path: './music/Jar-Of-Hearts-Christina-Perri-Christina-Perri.mp3'
        },
        {
            name: 'Có lẽ em',
            singer: 'Bích Phương',
            path: './music/Co-Le-Em-Bich-Phuong.mp3'
        },
        {
            name: 'Dễ thay đổi',
            singer: 'Vương Tĩnh Văn',
            path: './music/De-Thay-Doi-Vuong-Tinh-Van-Khong-Map.mp3'
        },
        {
            name: 'Say you do',
            singer: 'Tiên Tiên',
            path: './music/Say-You-Do-Tien-Tien.mp3'
        },
        {
            name: 'Vẫn',
            singer: 'Bích Phương',
            path: './music/Van-Bich-Phuong.mp3'
        },
        {
            name: 'Vây giữ',
            singer: 'Vương Tĩnh Văn',
            path: './music/Vay-Giu-Vuong-Tinh-Van-Khong-Map.mp3'
        }
    ],
    
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                    <div class="thumb" style="background-image: url('https://scontent-xsp1-2.xx.fbcdn.net/v/t39.30808-6/224930175_2962450864015047_873747107842470231_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=a5xc43BWW0sAX94Xy4-&_nc_ht=scontent-xsp1-2.xx&oh=1fb9cf60e74f5d9f7d8f4c42345815c1&oe=613FD539')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },

    getCurrentSong: function() {
        return this.songs[this.currentIndex];
    },

    handleEvents: function() {
        const cdThumbAnimation = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimation.pause();
 
        playBtn.onclick = function() {
            if(app.isPlaying){
                audio.pause();
            } else {
                audio.play();
            }
        }

        audio.onplay = function() {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimation.play();
        }
        audio.onpause = function() {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimation.pause();
        }
        audio.ontimeupdate = function() {
            if(audio.duration) {
                progress.style.width = Math.floor((audio.currentTime / audio.duration) *100) +'px';
            }
        }
        
        nextBtn.onclick = function() {
            if(app.isRandom){
                app.playRandomSong();
            }else{
                app.nextSong();
            }
            audio.play();
            app.render();
        }
        prevBtn.onclick = function() {
            if(app.isRandom){
                app.playRandomSong();
            }else{
                app.preSong();
            }
            audio.play();
            app.render();
        }
        randomBtn.onclick = function(e) {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle('active', app.isRandom);
            app.playRandomSong();
        }
        audio.onended = function() {
            if(app.isRepeat){
                audio.play();
            }else {
                nextBtn.click();
            }
            
        }
        repeatBtn.onclick = function(e) {
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle('active', app.isRepeat);
        }
        playlist.onclick = function(e) {
            const songClick = e.target.closest('.song:not(.active)')
            if(songClick) {
                app.currentIndex = Number(songClick.dataset.index);
                app.loadCurrentSong();
                app.render();
                audio.play();
            }
        }
    },

    loadCurrentSong: function() {
        
        heading.textContent = this.getCurrentSong().name;
        singer.textContent = this.getCurrentSong().singer;
        audio.src = this.getCurrentSong().path;
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex>=this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    preSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0){
            this.currentIndex = this.songs.length -1 ;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function() {
        this.getCurrentSong();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    }
}

app.start();


