import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Target, TargetAmount, TargetInsert } from 'src/app/targets/interfaces/target';
import { Observable, map } from 'rxjs';
import {
  TargetsResponse,
  SingleTargetResponse,
} from 'src/app/targets/interfaces/responses';
@Injectable({
  providedIn: 'root',
})
export class TargetService {
  #targetsUrl = 'targets';
  #http = inject(HttpClient);

  getTargets(): Observable<Target[]> {
    return this.#http
      .get<TargetsResponse>(`${this.#targetsUrl}`)
      .pipe(map((resp) => resp.targets));
  }

  getTargetsByUserId(userId: number): Observable<Target[]> {
    return this.#http
      .get<TargetsResponse>(`${this.#targetsUrl}/user/${userId}`)
      .pipe(map((resp) => resp.targets));
  }

  getTargetById(id: number): Observable<Target> {
    return this.#http
      .get<SingleTargetResponse>(`${this.#targetsUrl}/${id}`)
      .pipe(map((resp) => resp.target));
  }

  addTarget(target: TargetInsert): Observable<Target> {
    return this.#http
      .post<SingleTargetResponse>(this.#targetsUrl, target)
      .pipe(map((resp) => resp.target));
  }

  editTarget(id: number, target: TargetInsert): Observable<Target> {
    return this.#http
      .patch<SingleTargetResponse>(`${this.#targetsUrl}/${id}`, target)
      .pipe(map((resp) => resp.target));
  }

  updateTargetAmount(targetId: Number, amount: TargetAmount): Observable<Target> {
    return this.#http
      .put<SingleTargetResponse>(`${this.#targetsUrl}/${targetId}`, amount)
      .pipe(map((resp) => resp.target));
  }

  deleteTarget(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#targetsUrl}/${id}`);
  }
}
