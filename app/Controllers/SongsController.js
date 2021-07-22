import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  ProxyState.songs.forEach(s => {
    template += s.playlistTemplate
  })
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ''
  ProxyState.playlist.forEach(s => {
    template += s.playlistTemplate
  })
  document.getElementById('playlist').innerHTML = template
}
function _drawActiveSong() {
  document.getElementById('active-song').innerHTML = ProxyState.activeSong.activeTemplate
}
//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on('songs', _drawResults)
    ProxyState.on('playlist', _drawPlaylist)
    ProxyState.on('activeSong', _drawActiveSong)
    this.getMySongs()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    let form = e.target
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
    form.reset()

  }

  async getMySongs() {
    try {
      await songService.getMySongs()
    } catch (error) {
      console.log("couldn't get the playlist:", error)
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      console.log(id)
      await songService.addSong(id)
    } catch (error) {
      console.error("couldn't add song", error)
    }
  }

  chooseSong(id, list) {
    songService.chooseSong(id, list)
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      await songService.removeSong(id)
    } catch (error) {
      console.error("couldn't remove song", error)
    }
  }
}
