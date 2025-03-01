// website.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  constructor(private firestore: Firestore) {}

  // Add a website with "approved" status directly
  addWebsite(url: string) {
    const approvedCollection = collection(this.firestore, "approved_websites");
    return addDoc(approvedCollection, { url, status: "approved" });
  }
}
