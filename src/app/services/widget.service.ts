// widget.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private renderer: Renderer2;

  constructor(private firestore: Firestore, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  async initWidget() {
    const website = window.location.origin;
    // Get the approved websites for the current origin.
    const approvedCollection = collection(this.firestore, "approved_websites");
    const q = query(
      approvedCollection,
      where("url", "==", website),
      where("status", "==", "approved")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    this.createWidgetButton();
  }

  private createWidgetButton() {
    const widgetBtn = this.renderer.createElement('button');
    this.renderer.setProperty(widgetBtn, 'innerText', '🦾 Accessibility');
    this.renderer.setStyle(widgetBtn, 'position', 'fixed');
    this.renderer.setStyle(widgetBtn, 'bottom', '20px');
    this.renderer.setStyle(widgetBtn, 'right', '20px');
    this.renderer.setStyle(widgetBtn, 'background', '#000');
    this.renderer.setStyle(widgetBtn, 'color', '#fff');
    this.renderer.setStyle(widgetBtn, 'padding', '10px');
    this.renderer.setStyle(widgetBtn, 'borderRadius', '5px');
    this.renderer.setStyle(widgetBtn, 'zIndex', '1000');
    this.renderer.listen(widgetBtn, 'click', () => this.openAccessibilitySidebar());
    this.renderer.appendChild(document.body, widgetBtn);
  }

  private openAccessibilitySidebar() {
    let sidebar = document.getElementById("accessibility-sidebar") as HTMLElement | null;
    if (!sidebar) {
      sidebar = this.renderer.createElement('div') as HTMLElement;
      this.renderer.setProperty(sidebar, 'id', 'accessibility-sidebar');
      this.renderer.setStyle(sidebar, 'position', 'fixed');
      this.renderer.setStyle(sidebar, 'top', '0');
      this.renderer.setStyle(sidebar, 'right', '0');
      this.renderer.setStyle(sidebar, 'width', '100%');
      this.renderer.setStyle(sidebar, 'height', '100%');
      this.renderer.setStyle(sidebar, 'background', '#fff');
      this.renderer.setStyle(sidebar, 'boxShadow', '-5px 0px 10px rgba(0,0,0,0.2)');
      this.renderer.setStyle(sidebar, 'padding', '20px');
      this.renderer.setStyle(sidebar, 'zIndex', '1001');
      this.renderer.setStyle(sidebar, 'transform', 'translateX(100%)');
      this.renderer.setStyle(sidebar, 'transition', 'transform 0.4s ease-in-out');
      sidebar.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Accessibility Options</h2>
          <button id="close-sidebar" style="font-size: 20px; cursor: pointer;">❌</button>
        </div>
        <button onclick="document.body.style.fontSize = 'larger'">Increase Font Size</button>
        <button onclick="document.body.style.fontSize = 'smaller'">Decrease Font Size</button>
        <button onclick="document.body.classList.toggle('high-contrast')">Toggle Contrast</button>
        <button onclick="document.body.classList.toggle('grayscale')">Grayscale Mode</button>
        <button onclick="new SpeechSynthesisUtterance(document.body.innerText).speak()">Read Aloud</button>
      `;
      this.renderer.appendChild(document.body, sidebar);
      // Open sidebar
      setTimeout(() => sidebar!.style.transform = 'translateX(0)', 10);
      // Add close listener
      setTimeout(() => {
        document.getElementById("close-sidebar")?.addEventListener('click', () => {
          sidebar!.style.transform = 'translateX(100%)';
        });
      }, 100);
    } else {
      // Toggle sidebar visibility
      sidebar.style.transform = sidebar.style.transform === 'translateX(100%)' ? 'translateX(0)' : 'translateX(100%)';
    }
  }
}
