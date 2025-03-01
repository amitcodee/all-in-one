import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetService } from './services/widget.service';
import { AdminComponent } from "./admin/admin.component";
import { WebsiteService } from './services/website.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,  // Standalone component
  imports: [ CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  newWebsiteUrl: string = '';

  constructor(
    private widgetService: WidgetService,
    private websiteService: WebsiteService
  ) {}

  ngOnInit() {
    this.widgetService.initWidget();
  }

  addWebsite() {
    if (this.newWebsiteUrl.trim()) {
      this.websiteService.addWebsite(this.newWebsiteUrl.trim()).then(() => {
        alert('Website Approved!');
        this.newWebsiteUrl = '';
      });
    }
  }
}
