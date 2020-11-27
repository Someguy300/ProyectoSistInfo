import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  categoryId = '';
  category: Category = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getUrlParams();
    console.log("Se ejecuto: UpdateCategoryComponent")
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('todoId');
    });
  }

  getCategoryById(): void {
    this.categoryService.getCategory(this.categoryId).subscribe((item) => {
      this.category = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
    });
  }
}
