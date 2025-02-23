import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherForm!: FormGroup;
  weatherData: any;
  weeklyForecast: any[] = [];
  errorMessage: string = '';
  translatedDescription: string = '';

  private apiKey = 'b1b15e88fa797225412429c1c50c122a1'; // 2b5fc755ac2ec59250868b5527df31c4
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({ city: [''] });
    
    this.setCurrentDate();
  }

  searchCity() {
    const city = this.weatherForm.get('city')?.value;
    if (!city) return;

    this.http.get(`${this.weatherUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fa`)
      .subscribe({
        next: (data: any) => {
          this.weatherData = data;
          this.getWeeklyForecast(data.coord.lat, data.coord.lon);
          this.translatedDescription = this.fixWeatherDescription(data.weather[0]?.description);
        },
        error: () => {
          this.errorMessage = 'شهر موردنظر یافت نشد!';
        }
      });

      
  }

  getWeeklyForecast(lat: number, lon: number) {
    this.http.get(`${this.forecastUrl}?lat=${lat}&lon=${lon}&cnt=7&appid=${this.apiKey}&units=metric&lang=fa`)
      .subscribe((response: any) => {
        this.weeklyForecast = response.list.map((day: any, index: number) => ({
          weekday: this.getWeekday(index),
          rainChance: day.pop ? Math.round(day.pop * 100) : 0,
          tempMax: day.temp.max,
          tempMin: day.temp.min,
          description: day.weather[0]?.description,
          icon: `https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`
        }));
        
        
      });
      
  }

  getWeekday(index: number): string {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const today = new Date().getDay();
    return days[(today + index) % 7];
  }

  fixWeatherDescription(description: string): string {
    const fixes: { [key: string]: string } = {
      'ابرهای پارچه پارچه شده': 'ابرهای پراکنده',
      'مه غلیظی': 'مه غلیظ',
      'باران بسیار زیاد': 'باران شدید',
      'ابرهای تکه تکه شده': 'ابرهای شکسته',
    };

    return fixes[description] || description;
  }

  currentDay: string = '';
  currentDate: string = '';


  setCurrentDate() {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const today = new Date();
    this.currentDay = days[today.getDay()];
    this.currentDate = today.toLocaleDateString('fa-IR');
  }


}
