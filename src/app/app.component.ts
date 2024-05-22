import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { GenresService } from './services/genres.service';
import { BrazilianStatesService } from './services/brazilian-states.service';
import { UsersListResponse } from './types/users-list-response';
import { GenresListResponse } from './types/genres-list-response';
import { StatesListResponse } from './types/states-list-response';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserBeforeAndAfterDialogComponent } from './components/user-before-and-after-dialog/user-before-and-after-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  userSelected: IUser[] | any = []; // Cópia bkp objeto original
  userSelectedIndex: number | undefined; // Index do objetos

  usersList: UsersListResponse = [];
  genresList: GenresListResponse = [];
  statesList: StatesListResponse = [];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _genresService: GenresService,
    private readonly _BrazilianStatesService: BrazilianStatesService,
    private readonly _matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getGenres();
    this.getStates();
  }

  onFormSubmit() {
    if (this.userSelectedIndex === undefined) return;
    const originalUser = this.usersList[this.userSelectedIndex];

    this.openBeforeAndAfterDialog(originalUser, this.userSelected);
  }

  openBeforeAndAfterDialog(originalUser: IUser, updateUser: IUser) {
    this._matDialog.open(UserBeforeAndAfterDialogComponent, {
      data: {
        originalUser: originalUser,
        updateUser: updateUser
      },
      minWidth: '70%',
    });
  }

  // Salvar index e a cópia do objeto. 
  // Output
  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];
    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
    }
  }

  private getStates() {
    this._BrazilianStatesService.getStates().subscribe((statesListResponse) => {
      this.statesList = statesListResponse;
    })
  }
  private getGenres() {
    this._genresService.getGenres().subscribe((GenresListResponse) => {
      this.genresList = GenresListResponse;
    })
  }

  private getUsers() {
    this._usersService.getUsers().subscribe((UsersListResponse) => {
      this.usersList = UsersListResponse;
    })
  }

}
