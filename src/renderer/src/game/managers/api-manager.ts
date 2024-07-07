import { io } from "socket.io-client";

export class ApiManager {
  socket: any;

  listenEvents = {}
  urlBase = 'http://localhost:3000'
  constructor() {
    
  }
  // TODO: REMOVE?
  connect() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
  }
  // TODO: REMOVE?
  async callWs(event: string, args: any, callback?: Function) {
    // console.log('SOCKET', this.socket)
    return new Promise((resolve, reject) => {
      // console.log('EMIT')
       this.socket.emit(event, args, (response) => {
        if(response.error) {
          console.error(response.error)
          reject(response.error)
        } else {
          console.info(event, response)
          resolve(response)
        }
       });
    })
  }
  
  onConnect() {
    console.log('Connected to server'); 
  }

  onDisconnect() {
    console.log('Disconnected from server');
  }
  async get(path: string, params: any = {}) {
    const query = new URLSearchParams(params).toString();
    return this.fetch(`${path}?${query}`);
  }
  async post(path: string, body: any = {}) {
    return this.fetch(path, body, 'POST');
  }

  async delete(path: string, body: any = {}) {
    return this.fetch(path, body, 'DELETE');
  }
  private fetch(path: string, params = {}, method = 'GET', headers = {}) {
    const body = method === 'GET' ? undefined : JSON.stringify(params);
    return fetch(`${this.urlBase}/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body,
    }).then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }
}