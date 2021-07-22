import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query + "&media=music";
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log('api results:', res.results)
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });

  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    const res = await sandBoxApi.get()
    console.log(res.data)
    ProxyState.playlist = res.data.map(s => new Song(s))
    console.log('playlist proxystate:', ProxyState.playlist)
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    console.log('you are trying to add song:', id)
    let chosenSong = ProxyState.songs.find(s => s.id == id)
    console.log('chosen song:', chosenSong)
    const res = await sandBoxApi.post('', chosenSong)
    console.log(res.data)
    ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
  }

  chooseSong(id, list) {
    let chosenSong = ProxyState[list].find(s => s.id == id)
    console.log('chosen song:', chosenSong)
    ProxyState.activeSong = chosenSong
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    console.log('you are trying to remove song:', id)
    let chosenSong = ProxyState.playlist.find(s => s.id == id)
    const res = await sandBoxApi.delete(chosenSong.id)
    console.log(res.data)
    ProxyState.playlist = ProxyState.playlist.filter(s => s.id != id)
  }
}

const service = new SongsService();
export default service;
