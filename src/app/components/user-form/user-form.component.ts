import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GenresListResponse } from '../../types/genres-list-response';
import { StatesListResponse } from '../../types/states-list-response';
import { IUser } from '../../interfaces/user/user.interface';
import { getPasswordStrengthValue } from '../../utils/get-password-strength-value';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnChanges {
  passwordStrengthValue = 0;

  minDate: Date | null = null;
  maxDate: Date | null = null;

  @Input() genresList: GenresListResponse = [];
  @Input() statesList: StatesListResponse = [];
  @Input() userSelected: IUser = {} as IUser;

  ngOnInit(): void {
    this.setMinAndMaxDate();
  }

  private setMinAndMaxDate() {
    this.minDate = new Date(new Date().getFullYear() - 100, 0, 1);
    this.maxDate = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const USER_CHANGED = changes['userSelected'];
    if (USER_CHANGED) {
      this.onPasswordChange(this.userSelected.password);
    }
  }

  onPasswordChange(password: string) {
    this.passwordStrengthValue = getPasswordStrengthValue(password);
  }
}
