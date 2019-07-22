import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User;
  pagination: Pagination;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  userParams: any = {};

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });

    this.user = this.authService.getCurrentUser();

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
    this.userParams.orderBy = 'lastActive';
    this.loadUser(this.pagination.currentPage, this.pagination.itemsPerPage);
  }

  loadUser(currentPage?: number, itemsPerPage?: number) {
    if (currentPage == null) {
      currentPage = 1;
    }
    if (itemsPerPage == null) {
      itemsPerPage = 12;
    }

    this.userService.getUsers(currentPage, itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination);
    this.loadUser(this.pagination.currentPage, this.pagination.itemsPerPage);
  }

}
