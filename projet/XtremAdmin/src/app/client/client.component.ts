import { Component, OnInit } from '@angular/core';
import { ClientService } from '../Services/client.service';
import { client } from '../Model/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: client[] = [];
  selectedClient: client | null = null;
  profileImage: string = "assets/images/profile.jpeg";

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

  displayClientDetails(client: client) {
    this.selectedClient = client;
    this.profileImage = client.photo_profil || "assets/images/profile.jpeg";
  }


}
