import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  editCategory: Category = null;
  categoryForm: FormGroup;
  categoryId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId');

      if (this.categoryId) {
        this.loading = true;
        this.categoryService.getCategory(this.categoryId).subscribe((item) => {
          this.editCategory = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.categoryForm.patchValue({
            nombre: this.editCategory.nombre,
          });
          this.loading = false;
        });
      }
    });
  }

  createForm(): void {
    this.categoryForm = this.fb.group({
      nombre: [''],
    });
  }

  createCategory(data: Category): void {
    this.loading = true;
    this.categoryService.createCategory(data).then((res) => {
      this.loading = false;
      this.router.navigate(['categoria']);
    });
  }

  updateCategory(data: Category): void {
    this.loading = true;
    this.categoryService.updateCategory(data, this.categoryId).then((res) => {
      this.loading = false;
      this.router.navigate(['categoria']);
    });
  }

  onSubmit(): void {
    const dataCategory: Category = {
      nombre: this.categoryForm.get('nombre').value,
    };

    if (this.editCategory) {
      this.updateCategory(dataCategory);
      return;
    }

    this.createCategory(dataCategory);
  }
}
