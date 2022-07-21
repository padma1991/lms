import { Injectable } from '@angular/core'

@Injectable()
export class SharedService {
    globalUrl: string;
    
    constructor() { }

    sendMessage(url: string) {
        this.globalUrl = url;
    }
}
