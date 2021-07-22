export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data._id;
  }

  get Template() {
    return `
    <div class="card">
    <img src="${this.albumArt}"
        class="card-img-top" alt="${this.album}">
    <div class="card-body">
        <div class="card-title">
            <h3>${this.title}</h3>
            <h6>$${this.price}</h6>
        </div>
        <div class="card-text">
            <h5>${this.artist}</h5>
            <h6><em>${this.album}</em></h6>
            <p>This is music!</p>
        </div>
        <div>
            <audio controls class="w-100">
                <source src="${this.preview}" type="">
                Your browser does not support the audio element.
            </audio>
        </div>
        <button class="btn btn-success" onclick="app.songsController.addSong('${this.id}')">ADD</button>
    </div>
</div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="card">
    <img src="${this.albumArt}"
        class="card-img-top" alt="${this.album}">
    <div class="card-body">
        <div class="card-title">
            <h3>${this.title}</h3>
            <h6>$${this.price}</h6>
        </div>
        <div class="card-text">
            <h5>${this.artist}</h5>
            <h6><em>${this.album}</em></h6>
            <p>This is music!</p>
        </div>
        <div>
            <audio controls class="w-100">
                <source src="${this.preview}" type="">
                Your browser does not support the audio element.
            </audio>
        </div>
        <button class="btn btn-danger" onclick="app.songsController.removeSong('${this.id}')">REMOVE</button>
    </div>
</div>
    
        `;
  }
}
