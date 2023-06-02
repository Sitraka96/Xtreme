import { Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { XtremePoint } from '../Model/XtremePoint';

@Injectable({
  providedIn: 'root'
})
export class XtremePointService {

  
  rates!: any[];
  loading = true;
  error: any;

  constructor(private apollo:Apollo) {
    
   }

   getXtremePoints(): QueryRef<any> {
    const query = gql`
      {
        xtremepoint {
          id_xtremepoint
          titre_xtremepoint
          point_xtremepoint
          prix_xtremepoint
          date_xtremepoint
        }
      }
    `;

    return this.apollo.use('xtremeEndpoint').watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only', // Specify the desired fetch policy here
    });
  }

  getXtremePointById(id_xtremepoint:any){
    const getXtremePoints = gql`
      query($id_xtremepoint:String){
        produit(id_xtremepoint:$id_xtremepoint){
            id_xtremepoint,
            titre_xtremepoint,
            point_xtremepoint,
            prix_xtremepoint,
            date_xtremepoint
        }
      }
    ` 
    return this.apollo.use('xtremeEndpoint')
    .watchQuery({
      query: getXtremePoints,
      variables:{
        id_xtremepoint:id_xtremepoint
      }
    })
  
   }

  addXtremePoint(xtremepoint:XtremePoint){
    const addxtremepoint = gql`
    mutation ($titre_xtremepoint: String,$point_xtremepoint:Float,$prix_xtremepoint:Float) {
        addxtremepoint(input: {titre_xtremepoint:$titre_xtremepoint,point_xtremepoint:$point_xtremepoint,prix_xtremepoint:$prix_xtremepoint}){
        id_xtremepoint,
        titre_xtremepoint,
        point_xtremepoint,
        prix_xtremepoint,
        date_xtremepoint
      }
    }
  `;
 
    return this.apollo.use('xtremeEndpoint')
    .mutate({
      mutation: addxtremepoint,
      variables: {
        titre_xtremepoint: String(xtremepoint.titre_xtremepoint),
        point_xtremepoint:xtremepoint.point_xtremepoint,
        prix_xtremepoint:xtremepoint.prix_xtremepoint
      }
      })
      
  }

  updateXtremePoint(xtremepoint:XtremePoint){
   
    const updatextremepoint = gql`
    mutation ($id_xtremepoint:String,$titre_xtremepoint: String,$point_xtremepoint:Float,$prix_xtremepoint:Float) {
      updateProduit(input: {id_xtremepoint:$id_xtremepoint,titre_xtremepoint:$titre_xtremepoint,point_xtremepoint:$point_xtremepoint,prix_xtremepoint:$prix_xtremepoint}){
        id_xtremepoint,
        titre_xtremepoint,
        point_xtremepoint,
        prix_xtremepoint,
        date_xtremepoint
      }
    }
  `;
 
    return this.apollo.use('xtremeEndpoint')
    .mutate({
      mutation:  updatextremepoint,
      variables: {
        titre_xtremepoint: String(xtremepoint.titre_xtremepoint),
        point_xtremepoint:xtremepoint.point_xtremepoint,
        prix_xtremepoint:xtremepoint.prix_xtremepoint,
        id_xtremepoint:xtremepoint.id_xtremepoint
      }
      })
  }

  delete(xtremepoint:XtremePoint){
    
    const deletextremepoint = gql`
    mutation ($id_xtremepoint:String) {
      deleteProduit(id_xtremepoint:$id_xtremepoint){
        id_xtremepoint,
        titre_xtremepoint,
        point_xtremepoint,
        prix_xtremepoint,
        date_xtremepoint
      }
    }
  `;
 
    return this.apollo.use('xtremeEndpoint')
    .mutate({
      mutation:  deletextremepoint,
      variables: {
        id_xtremepoint:xtremepoint.id_xtremepoint
      }
      })
  }
}
