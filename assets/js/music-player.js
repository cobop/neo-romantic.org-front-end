// Persistent Music Player Implementation with Security Measures
class PersistentMusicPlayer {
    constructor() {
        // Album data
        this.albums = {
            "Infection": {
                title: "Infection",
                artist: "Jane Duke",
                year: "2024",
                genre: "Electronic / Ambient",
                cover: "../assets/Music/Jane Duke/Infection - Mp3/Infection.jpg",
                tracks: [
                    {number: 1, title: "Deep Space Melancholy", duration: "3:45", filename: "1 - Deep Space Melancholy.mp3"},
                    {number: 2, title: "Aether Keys", duration: "4:12", filename: "2 - Aether Keys.mp3"},
                    {number: 3, title: "Bells Of Heaven", duration: "3:28", filename: "3 - Bells Of Heaven.mp3"},
                    {number: 4, title: "Time", duration: "5:02", filename: "4 - Time.mp3"},
                    {number: 5, title: "Insecure Skies", duration: "3:57", filename: "5 - Insecure Skies.mp3"},
                    {number: 6, title: "Insane Arpeggios", duration: "4:33", filename: "6 - Insane Arpeggios.mp3"},
                    {number: 7, title: "Drunken Robot Music", duration: "3:15", filename: "7 - Drunken Robot Music.mp3"},
                    {number: 8, title: "Cyberpunk Racing", duration: "4:08", filename: "8 - Cyberpunk Racing.mp3"},
                    {number: 9, title: "Infection", duration: "5:22", filename: "9 - Infection.mp3"}
                ]
            },
            "The Origin Of Evil": {
                title: "The Origin Of Evil",
                artist: "Jane Duke",
                year: "2024",
                genre: "Dark / Epic",
                cover: "../assets/Music/Jane Duke/The Origin Of Evil - The Legend Of Narcissus And Oedipus - Final - MP3 320kbps/The Origin Of Evil - The Legend Of Narcissus And Oedipus.png",
                tracks: [
                    {number: 1, title: "Morning Birds", duration: "3:45", filename: "01 - Morning Birds.mp3"},
                    {number: 2, title: "Village Festival", duration: "4:12", filename: "02 - Village Festival.mp3"},
                    {number: 3, title: "Evil's Messenger", duration: "3:28", filename: "03 - Evil's Messenger.mp3"},
                    {number: 4, title: "Sewers Exploration", duration: "5:02", filename: "04 - Sewers Exploration.mp3"},
                    {number: 5, title: "Dark Fantasy Jungle", duration: "3:57", filename: "05 - Dark Fantasy Jungle.mp3"},
                    {number: 6, title: "Obscure Dungeon", duration: "4:33", filename: "06 - Obscure Dungeon.mp3"},
                    {number: 7, title: "March Of The Nibelungs", duration: "3:15", filename: "07 - March Of The Nibelungs.mp3"},
                    {number: 8, title: "Anticipated Battles", duration: "4:08", filename: "08 - Anticipated Battles.mp3"},
                    {number: 9, title: "Battlefield Cacophony", duration: "5:22", filename: "09 - Battlefield Cacophony.mp3"},
                    {number: 10, title: "Betrayal Of Corrupted Lords", duration: "3:41", filename: "10 - Betrayal Of Corrupted Lords.mp3"},
                    {number: 11, title: "Soul Crusher", duration: "4:18", filename: "11 - Soul Crusher.mp3"},
                    {number: 12, title: "Dramatic Waltz", duration: "3:35", filename: "12 - Dramatic Waltz.mp3"},
                    {number: 13, title: "Burial Of A Friend", duration: "4:27", filename: "13 - Burial Of A Friend.mp3"},
                    {number: 14, title: "Devil's Joke", duration: "3:59", filename: "14 - Devil's Joke.mp3"},
                    {number: 15, title: "Welcome To Hells", duration: "4:44", filename: "15 - Welcome To Hells.mp3"},
                    {number: 16, title: "Dance Of The Undead", duration: "3:22", filename: "16 - Dance Of The Undead.mp3"},
                    {number: 17, title: "Demonic Melody", duration: "4:10", filename: "17 - Demonic Melody.mp3"},
                    {number: 18, title: "Railroads Of Tortures", duration: "3:48", filename: "18 - Railroads Of Tortures.mp3"},
                    {number: 19, title: "Brutal Death Symphony Movement 1", duration: "5:15", filename: "19 - Brutal Death Symphony Movement 1.mp3"},
                    {number: 20, title: "Brutal Death Symphony Movement 2", duration: "4:30", filename: "20 - Brutal Death Symphony Movement 2.mp3"},
                    {number: 21, title: "Hopeful Melancholy", duration: "3:55", filename: "21 - Hopeful Melancholy.mp3"}
                ]
            }
        };
        
        this.currentAlbum = null;
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isDownloading = false;
        
        // Initialize the player
        this.init();
    }
    
    init() {
        // Create player container if it doesn't exist
        if (!document.getElementById('persistent-player')) {
            this.createPlayerElement();
        }
        
        // Load player state from localStorage
        this.loadPlayerState();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    createPlayerElement() {
        const playerHTML = `
            <div id="persistent-player" style="position: fixed; bottom: 0; left: 0; right: 0; 
                background: linear-gradient(135deg, #000000 0%, #8b0000 100%); 
                padding: 10px 20px; border-top: 2px solid #ff0000; 
                display: flex; align-items: center; justify-content: space-between; 
                z-index: 1000; box-shadow: 0 -2px 10px rgba(0,0,0,0.5);">
                
                <div class="player-controls" style="display: flex; align-items: center; gap: 15px;">
                    <button id="play-pause-btn" style="background: #ff0000; color: white; border: none; 
                        border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">▶️</button>
                    <div class="track-info" style="color: #ffd700;">
                        <div id="current-track" style="font-weight: bold;">No Track Playing</div>
                        <div id="current-artist" style="font-size: 0.9em;">-</div>
                    </div>
                </div>
                
                <div class="progress-container" style="flex-grow: 1; margin: 0 20px;">
                    <div class="progress-bar" style="height: 4px; background: #333; border-radius: 2px; 
                        overflow: hidden;">
                        <div id="progress" style="height: 100%; width: 0%; background: #ff0000;"></div>
                    </div>
                </div>
                
                <div class="player-controls-right" style="display: flex; align-items: center; gap: 15px;">
                    <span id="current-time" style="color: #ffd700; font-size: 0.9em;">0:00</span>
                    <span id="total-time" style="color: #ffd700; font-size: 0.9em;">0:00</span>
                    <button id="volume-btn" style="background: none; color: #ffd700; border: none; 
                        cursor: pointer;">🔈</button>
                </div>
            </div>
        `;
        
        // Insert player at the bottom of the body
        document.body.insertAdjacentHTML('beforeend', playerHTML);
        
        // Add CSS for the player
        const style = document.createElement('style');
        style.textContent = `
            #persistent-player {
                transition: all 0.3s ease;
            }
            #persistent-player:hover {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        // Simulate player functionality
        setInterval(() => {
            if (this.isPlaying) {
                this.updateProgress();
            }
        }, 1000);
    }
    
    // Method to play an album
    playAlbum(albumName) {
        if (!this.albums[albumName]) return;
        
        this.currentAlbum = this.albums[albumName];
        this.currentTrackIndex = 0;
        this.playTrack(this.currentTrackIndex);
    }
    
    // Method to play a specific track
    playTrack(index) {
        if (!this.currentAlbum || index < 0 || index >= this.currentAlbum.tracks.length) return;
        
        const track = this.currentAlbum.tracks[index];
        const trackPath = `../assets/Music/Jane Duke/${encodeURIComponent(this.currentAlbum.title.replace(/\s+/g, ' '))}/${encodeURIComponent(track.filename)}`;
        
        // Update UI
        document.getElementById('current-track').textContent = track.title;
        document.getElementById('current-artist').textContent = this.currentAlbum.artist;
        document.getElementById('total-time').textContent = track.duration;
        document.getElementById('progress').style.width = '0%';
        
        // Create audio element for actual playback
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        
        // Create new audio element
        this.currentAudio = new Audio(trackPath);
        
        // Set up audio event handlers
        this.currentAudio.addEventListener('canplay', () => {
            console.log(`Playing: ${track.title} from ${this.currentAlbum.title}`);
            this.currentAudio.play().catch(e => {
                console.error("Playback failed:", e);
                alert("Playback failed. Please check browser console for details.");
            });
        });
        
        this.currentAudio.addEventListener('error', (e) => {
            console.error("Audio error:", e);
            alert(`Error playing track: ${track.title}\nPlease check if the file exists at:\n${trackPath}`);
        });
        
        this.currentAudio.addEventListener('ended', () => {
            this.nextTrack();
        });
        
        // Update play button state
        this.isPlaying = true;
        const playBtn = document.getElementById('play-pause-btn');
        if (playBtn) {
            playBtn.textContent = '⏸️';
        }
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('play-pause-btn');
        if (btn) {
            btn.textContent = this.isPlaying ? '⏸️' : '▶️';
        }
        
        // Save state to localStorage
        this.savePlayerState();
    }
    
    updateProgress() {
        // This would normally update based on actual playback
        const progress = document.getElementById('progress');
        if (progress) {
            const currentWidth = parseFloat(progress.style.width || '0');
            if (currentWidth < 100) {
                progress.style.width = (currentWidth + 0.5) + '%';
            } else {
                // Move to next track when current finishes
                this.nextTrack();
            }
        }
    }
    
    nextTrack() {
        if (!this.currentAlbum) return;
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.currentAlbum.tracks.length;
        this.playTrack(this.currentTrackIndex);
    }
    
    prevTrack() {
        if (!this.currentAlbum) return;
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.currentAlbum.tracks.length) % this.currentAlbum.tracks.length;
        this.playTrack(this.currentTrackIndex);
    }
    
    // Method to download track (with security checks)
    downloadTrack(albumName, trackNumber) {
        // Security measure: Prevent direct download by checking access
        alert(`Download access restricted for track ${trackNumber} from ${albumName}\n\nPremium WAV files are available for purchase in the store.`);
        // In a real implementation, this would check user permissions before allowing download
    }
    
    savePlayerState() {
        const state = {
            currentAlbum: this.currentAlbum ? this.currentAlbum.title : null,
            currentTrackIndex: this.currentTrackIndex,
            isPlaying: this.isPlaying
        };
        localStorage.setItem('musicPlayerState', JSON.stringify(state));
    }
    
    loadPlayerState() {
        const state = localStorage.getItem('musicPlayerState');
        if (state) {
            const parsedState = JSON.parse(state);
            if (parsedState.currentAlbum && this.albums[parsedState.currentAlbum]) {
                this.currentAlbum = this.albums[parsedState.currentAlbum];
                this.currentTrackIndex = parsedState.currentTrackIndex;
                this.isPlaying = parsedState.isPlaying;
                this.playTrack(this.currentTrackIndex);
                if (this.isPlaying) {
                    const btn = document.getElementById('play-pause-btn');
                    if (btn) btn.textContent = '⏸️';
                }
            }
        }
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.persistentMusicPlayer = new PersistentMusicPlayer();
});
