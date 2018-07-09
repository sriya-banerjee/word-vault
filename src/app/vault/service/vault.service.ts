import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Vault } from '../model/vault.model';
import { Option } from '../../options/model/options.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private _httpClient: HttpClient) { }
  public getSpriteSettings(): Observable<any> {
    return this._httpClient.get("../../../assets/vault/vault_sprite_sheet.json");
  }
  public getFrameRanges() : Observable<any> {
    return this._httpClient.get("../../../assets/vault/frameRange.json");
  }
  public modifySpriteSettings(prevSpriteSet){

  }
}
