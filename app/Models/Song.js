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



  get activeTemplate() {
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
    return `<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${this.albumArt}" alt="${this.album}" class="w-100">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">${this.artist} <i class="btn text-danger mdi mdi-delete" onclick="app.songsController.removeSong('${this.id}')"></i></p>
        
      </div>
    </div>
  </div>
</div>`;
  }

  get
}
