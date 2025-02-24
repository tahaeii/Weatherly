import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/core/services/weather.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  translatedDescription: string = ''; // Store Translated Weather Description
  currentDate: string = ''; // Store Current Date In Persian Calendar
  weatherForm!: FormGroup; // Define The Form Group For City Search
  weeklyForecast: any[] = []; // Store Weekly Forecast Data
  currentDay: string = ''; // Store Current Day Name
  weatherData: any; // Store Current Weather Data

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private _notif: NotificationService) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({ city: [''] }); // Initialize The Form
    this.setCurrentDate(); // Set Current Date
    this.getWeatherForCity('مشهد'); // Load Default Weather Data For Mashhad
  }

  searchCity() {
    // Get The Entered City Name
    const city = this.weatherForm.get('city')?.value;
    if (!city) {
      this._notif.warning('!لطفاً نام یک شهر را وارد کنید', 3000);
      return;
    }
    this.getWeatherForCity(city);
  }

  getWeatherForCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (data: any) => {
        this.weatherData = data; // Store The Received Weather Data
        this.getWeeklyForecast(data.coord.lat, data.coord.lon); // Fetch Weekly Forecast Based On Coordinates
        this.translatedDescription = this.fixWeatherDescription(data.weather[0]?.description); // Translate Weather Description
        this._notif.success(`!آب و هوای ${city} با موفقیت دریافت شد`, 3000);
      },
      error: () => {
        this._notif.error('شهر موردنظر یافت نشد!', 3000);
      }
    });
  }

  getWeeklyForecast(lat: number, lon: number): void {
    this.weatherService.getWeeklyForecast(lat, lon).subscribe({
      next: (response: any) => {
        if (!response?.list) {
          this.weeklyForecast = []; // Clear Weekly Forecast If No Data Is Available
          this._notif.warning('!پیش‌بینی ۷ روزه در دسترس نیست', 3000);
          return;
        }

        this.weeklyForecast = response.list.map((day: any, index: number) => {
          return {
            weekday: this.getWeekday(index), // Get The Weekday Name
            rainChance: day.pop ? Math.round(day.pop * 100) : 0, // Convert Rain Probability To Percentage
            tempMax: day.temp.max, // Store Maximum Temperature
            tempMin: day.temp.min, // Store Minimum Temperature
            description: day.weather[0]?.description || 'نامشخص', // Store Weather Description
            icon: `https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`, // Generate Weather Icon URL
            isToday: index === 0 // Check If The Day Is Today
          };
        });
      },
      error: () => {
        this._notif.error('!پیش‌بینی ۷ روزه با مشکل مواجه شد', 3000);
      }
    });
  }

  getWeekday(index: number): string {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']; // Define Persian Weekdays
    const today = new Date().getDay(); // Get Today's Day Index (0 = Sunday, ..., 6 = Saturday)
    return [...days.slice(today), ...days.slice(0, today)][index]; // Reorder Days Starting From Today
  }

  fixWeatherDescription(description: string): string {
    const fixes: Record<string, string> = { // Define Common Weather Description Fixes
      'ابرهای پارچه پارچه شده': 'ابرهای پراکنده', // Fix "Scattered Clouds"
      'مه غلیظی': 'مه غلیظ', // Fix "Dense Fog"
      'باران بسیار زیاد': 'باران شدید', // Fix "Heavy Rain"
      'ابرهای تکه تکه شده': 'ابرهای شکسته', // Fix "Broken Clouds"
    };
    return fixes[description] || description; // Return Fixed Description Or Original If No Fix Exists
  }

  setCurrentDate() {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']; // Define Persian Weekdays
    const today = new Date(); // Get Current Date
    this.currentDay = days[today.getDay()]; // Get The Current Day Name
    this.currentDate = today.toLocaleDateString('fa-IR'); // Format Date In Persian Calendar
  }
}

