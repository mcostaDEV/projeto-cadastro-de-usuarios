import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsersPlaceholderListResponse } from "../types/users-placeholder-list-response";

@Injectable({
    providedIn: 'root',
})
export class UsersPlaceholderService {

    constructor(
        private readonly _httpClient: HttpClient
    ) { }


    getUsersPlaceholder(): Observable<UsersPlaceholderListResponse | any> {
        return this._httpClient.get('https://jsonplaceholder.typicode.com/users');
    }
}