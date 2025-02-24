import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'b1b15e88fa797225412429c1c50c122a1'; // 2b5fc755ac2ec59250868b5527df31c4 // API Key For Weather Data
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Base URL For Current Weather API
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily'; // Base URL For Weekly Forecast API

  constructor(private http: HttpClient) { } // Inject HttpClient To Make API Requests

  getWeather(city: string): Observable<any> {
    // Fetch Current Weather Data For A Given City
    return this.http.get<any>(`${this.weatherUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fa`);
  }

  getWeeklyForecast(lat: number, lon: number): Observable<any> {
    // Fetch 7-Day Weather Forecast Using Latitude & Longitude
    return this.http.get<any>(`${this.forecastUrl}?lat=${lat}&lon=${lon}&cnt=7&appid=${this.apiKey}&units=metric&lang=fa`);
  }

}