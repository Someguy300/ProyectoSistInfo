import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categorys: Array<Category> = [];
  loading = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategorys();
  }

  getAllCategorys(): void {
    this.loading = true;
    this.categoryService.getAllCategorys().subscribe((items) => {
      // Setting up categorys
      this.categorys = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Category)
      );

      this.loading = false;
    });
  }

  deleteCategory(categoryId: string): void {
    this.loading = true;
    this.categoryService.deleteCategory(categoryId).then((res) => {
      this.loading = false;
    });
  }
}