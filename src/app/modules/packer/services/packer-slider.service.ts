import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class PackerSliderService implements OnInit {
    
    onSwipe$: Subject<string> = new Subject
    
    constructor() {}

    ngOnInit(): void {

    }


    swipe(direction: string = 'left') {
        this.onSwipe$.next(direction)
    }

}